import * as Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { mocked } from 'ts-jest/dist/utils/testing';
import { createSpikeMockImplementation } from './spikeApiMock';
import { Spike } from '../lib';
import config from '../config';
import { SpikeApi } from '../lib/spike-api';
import { ILogger, IRedisOptions, ISpikeOptions } from '../lib/interfaces';
import { FakeAxiosError } from './axios';
import { trycatch } from '../utils';

const {
    test: { spike: spikeConfig },
} = config;

jest.mock('../lib/spike-api');

const mockedSpikeApi = mocked(SpikeApi);

const { getKeys, getLastTokenFromSpike, getPublicKeyMock, getPublicKeyPath, getTokenMock, removeTemporaryFiles } = createSpikeMockImplementation(
    mockedSpikeApi,
    'spike',
);

describe('Spike class tests', () => {
    let spike: Spike;

    const redisOptions: IRedisOptions = {
        uri: 'redis://localhost',
    };

    const redis = new Redis(redisOptions.uri);

    afterAll(async () => {
        await redis.flushdb();
        redis.disconnect();

        removeTemporaryFiles();
    });

    describe.each([
        [{ useRedis: true, publicKeyType: 'old' }],
        [{ useRedis: true, publicKeyType: 'new' }],
        [{ useRedis: true, publicKeyType: 'none' }],
        [{ useRedis: false, publicKeyType: 'old' }],
        [{ useRedis: false, publicKeyType: 'new' }],
        [{ useRedis: false, publicKeyType: 'none' }],
        [{ useRedis: false, publicKeyType: 'none', expirationOffset: -60 * 1000 }],
    ])('With options: %j', (testConfig: { useRedis: boolean; publicKeyType: string; expirationOffset?: number }) => {
        const { useRedis, publicKeyType, expirationOffset } = testConfig;

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
                    publicKeyFullPath: getPublicKeyPath(publicKeyType),
                },
                redis: useRedis ? redisOptions : undefined,
                logger: silentLogger,
            };

            if (expirationOffset) {
                spikeOptions.token = { expirationOffset };
            }

            spike = new Spike(spikeOptions);
        });

        afterEach(() => {
            return spike.close();
        });

        describe('Spike.initialize() tests', () => {
            it('should handle double initialize', async () => {
                await spike.initialize();
                await spike.initialize();
            });
        });

        describe('Spike.close() tests', () => {
            it('should handle double close', async () => {
                await spike.initialize();
                await spike.close();
                await spike.close();
            });
        });

        describe('Spike.getToken() tests', () => {
            if (publicKeyType === 'old') {
                it('should fail to get token for old public key', async () => {
                    await expect(() => spike.getToken(spikeConfig.audience)).rejects.toThrow(
                        `Received Spike token is not valid according to both old and updated public keys`,
                    );
                });

                return;
            }

            it('should get token', async () => {
                const firstToken = await spike.getToken(spikeConfig.audience);
                expect(firstToken).toBe(getLastTokenFromSpike());

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
                expect(token).toEqual(getLastTokenFromSpike());
            });

            it.each([[400], [401], [429]])('should abort retrying for status %d', async (status: number) => {
                getTokenMock.mockImplementationOnce(() => {
                    throw new FakeAxiosError('Fake axios error', 'ERROR', status);
                });

                await expect(() => spike.getToken(spikeConfig.audience)).rejects.toThrowError(FakeAxiosError);
            });

            if (publicKeyType === 'none') {
                it('should handle public key update at spike server', async () => {
                    getPublicKeyMock.mockImplementationOnce(async () => {
                        return getKeys('old').publicKey;
                    });

                    const token = await spike.getToken(spikeConfig.audience);
                    expect(token).toEqual(getLastTokenFromSpike());
                });
            }

            if (useRedis) {
                it('should get remote token if it already exists', async () => {
                    // @ts-ignore
                    const { options } = spike;

                    const { keyPrefix } = options.redis!;
                    const { clientId } = options.spike;

                    const audience = 'some-test-audience';
                    const token = getTokenMock({ clientId, clientSecret: 'secret', audience });

                    await redis.hset(`${keyPrefix}${clientId}`, audience, token);

                    const receivedToken = await spike.getToken(audience);
                    expect(receivedToken).toEqual(token);

                    expect(getTokenMock).toBeCalledTimes(1);
                });
            }
        });

        describe('Spike.getToken in parallel tests', () => {
            it('should get token once in parallel', async () => {
                const getAudience = (index: number) => `audience${index}`;
                const audiencesCount = 10;
                const parallelCallersCount = 50;

                const promises: Promise<string>[] = [];
                for (let i = 0; i < parallelCallersCount; i++) {
                    const audienceIndex = i % audiencesCount;

                    promises.push(spike.getToken(getAudience(audienceIndex)));
                }

                const { err, result } = await trycatch(() => Promise.all(promises));

                if (publicKeyType === 'old') {
                    expect(err).toBeInstanceOf(Error);
                    return;
                }

                expect(result).toHaveLength(parallelCallersCount);

                const tokens = result as string[];

                expect(getTokenMock).toBeCalledTimes(audiencesCount);

                for (let i = 0; i < tokens.length; i++) {
                    const token = tokens[i];
                    const audienceIndex = i % audiencesCount;

                    const decodedToken = jwt.decode(token, { json: true });
                    expect(decodedToken).not.toBe(null);
                    expect(decodedToken!.aud).toEqual(getAudience(audienceIndex));
                }
            });
        });
    });
});
