import { mocked } from 'ts-jest/utils';
import Redis from 'ioredis';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Spike } from '../lib';
import { IGetTokenOptions, SpikeApi } from '../lib/spike-api';
import config from '../config';
import { ILogger, IRedisOptions, ISpikeOptions } from '../lib/interfaces';
import { FakeAxiosError } from './axios';

const {
    test: { spike: spikeConfig },
} = config;

const newPublicKeyPath = './src/tests/static/publickey.pem';
const oldPublicKeyPath = './src/tests/static/publickey_old.pem';

const generateKeysPair = () => {
    const keys = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'passphrase',
        },
    });

    return keys;
};

const oldKeys = generateKeysPair();
const keys = generateKeysPair();

fs.writeFileSync(newPublicKeyPath, keys.publicKey);
fs.writeFileSync(oldPublicKeyPath, oldKeys.publicKey);

const getPublicKeyPath = (type: string) => {
    switch (type) {
        case 'old':
            return oldPublicKeyPath;

        case 'new':
            return newPublicKeyPath;

        case 'none':
            return undefined;

        default:
            throw new Error(`Unknown key type`);
    }
};

let lastTokenFromSpike: string;

const getPublicKeyMock = jest.fn().mockImplementation(async () => {
    return keys.publicKey;
});

const getTokenMock = jest.fn().mockImplementation((options: IGetTokenOptions) => {
    const payload = {
        clientId: options.clientId,
        clientName: 'testClientName',
        scope: ['get', 'set'],
    };

    const token = jwt.sign(
        payload,
        { key: keys.privateKey, passphrase: 'passphrase' },
        { audience: options.audience, expiresIn: '1h', algorithm: 'RS256' },
    );

    lastTokenFromSpike = token;

    return token;
});

jest.mock('../lib/spike-api');

const mockedSpikeApi = mocked(SpikeApi, true);
mockedSpikeApi.mockImplementation(() => {
    return ({
        getToken: getTokenMock,
        getPublicKey: getPublicKeyMock,
    } as unknown) as SpikeApi;
});

describe('Spike class tests', () => {
    let spike: Spike;

    const redisOptions: IRedisOptions = {
        uri: 'redis://localhost',
    };

    const redis = new Redis(redisOptions.uri);

    afterAll(async () => {
        await redis.flushdb();
        redis.disconnect();

        fs.unlinkSync(oldPublicKeyPath);
        fs.unlinkSync(newPublicKeyPath);
    });

    describe.each([
        [{ useRedis: true, usePublicKey: 'old' }],
        [{ useRedis: true, usePublicKey: 'new' }],
        [{ useRedis: true, usePublicKey: 'none' }],
        [{ useRedis: false, usePublicKey: 'old' }],
        [{ useRedis: false, usePublicKey: 'new' }],
        [{ useRedis: false, usePublicKey: 'none' }],
        [{ useRedis: false, usePublicKey: 'none', expirationOffset: -60 * 1000 }],
    ])('With options: %j', (testConfig: { useRedis: boolean; usePublicKey: string; expirationOffset?: number }) => {
        const { useRedis, usePublicKey, expirationOffset } = testConfig;

        beforeEach(async () => {
            if (useRedis) {
                await redis.flushdb();
            }

            mockedSpikeApi.mockClear();
            getPublicKeyMock.mockClear();
            getTokenMock.mockClear();

            const silentLogger: ILogger = {
                debug: () => {},
                warn: () => {},
                error: () => {},
                info: () => {},
                trace: () => {},
            };

            const { url, clientId, clientSecret } = spikeConfig;

            const spikeOptions: ISpikeOptions = {
                spike: {
                    url,
                    clientId,
                    clientSecret,
                    publicKeyFullPath: getPublicKeyPath(usePublicKey),
                },
                redis: useRedis ? redisOptions : undefined,
                logger: silentLogger,
            };

            if (expirationOffset) {
                spikeOptions.token = { expirationOffset };
            }

            spike = new Spike(spikeOptions);

            await spike.initialize();
        });

        afterEach(() => {
            spike.close();
        });

        describe('Spike.getToken() tests', () => {
            if (usePublicKey === 'old') {
                it('should fail to get token for old public key', async () => {
                    await expect(() => spike.getToken(spikeConfig.audience)).rejects.toThrow(
                        `Received Spike token is not valid according to both old and updated public keys`,
                    );
                });

                return;
            }

            it('should get token', async () => {
                const firstToken = await spike.getToken(spikeConfig.audience);
                expect(firstToken).toBe(lastTokenFromSpike);

                expect(getTokenMock.mock.calls.length).toBe(1);

                for (let i = 0; i < 5; i++) {
                    const newToken = await spike.getToken(spikeConfig.audience);
                    expect(newToken).toBe(firstToken);
                }

                expect(getTokenMock.mock.calls.length).toBe(1);
            });

            it('should retry to access spike', async () => {
                getTokenMock.mockImplementationOnce(() => {
                    throw new FakeAxiosError('Fake axios timeout', 'ETIMEOUT');
                });

                const token = await spike.getToken(spikeConfig.audience);
                expect(token).toEqual(lastTokenFromSpike);
            });

            it.each([[400], [401], [429]])('should abort retrying for status %d', async (status: number) => {
                getTokenMock.mockImplementationOnce(() => {
                    throw new FakeAxiosError('Fake axios error', 'ERROR', status);
                });

                await expect(() => spike.getToken(spikeConfig.audience)).rejects.toThrowError(FakeAxiosError);
            });

            if (usePublicKey === 'none') {
                it('should handle public key update at spike server', async () => {
                    getPublicKeyMock.mockImplementationOnce(async () => {
                        return oldKeys.publicKey;
                    });

                    const token = await spike.getToken(spikeConfig.audience);
                    expect(token).toEqual(lastTokenFromSpike);
                });
            }
        });
    });
});
