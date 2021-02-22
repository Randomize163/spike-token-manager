import * as Redis from 'ioredis';
import { mocked } from 'ts-jest/dist/utils/testing';
import { createSpikeMockImplementation } from './spikeApiMock';
import { SpikeApi } from '../lib/spike-api';
import * as getTokenCreator from '../lib';

const redisUri = 'redis://localhost';

jest.mock('../lib/spike-api');

const mockedSpikeApi = mocked(SpikeApi);

const { getLastTokenFromSpike, getPublicKeyMock, getPublicKeyPath, getTokenMock, removeTemporaryFiles } = createSpikeMockImplementation(
    mockedSpikeApi,
    'depricated',
);

describe('Depricated interface tests', () => {
    const redis = new Redis(redisUri);

    beforeAll(async () => {});

    afterAll(() => {
        redis.disconnect();
        removeTemporaryFiles();
    });

    beforeEach(async () => {
        mockedSpikeApi.mockClear();
        getTokenMock.mockClear();
        getPublicKeyMock.mockClear();

        await redis.flushdb();
    });

    afterEach(() => {});

    it.each([
        [{ useRedis: false, retries: 3, sleepBetweenRetries: 1000 }],
        [{ useRedis: true, retries: 3, sleepBetweenRetries: 1000 }],
        [{ useRedis: false, retries: undefined, sleepBetweenRetries: 1000 }],
        [{ useRedis: false, retries: 3, sleepBetweenRetries: undefined }],
        [{ useRedis: false, retries: undefined, sleepBetweenRetries: undefined }],
    ])('should getToken() with options: %j', async (options) => {
        jest.setTimeout(10 * 1000);

        const { useRedis, retries, sleepBetweenRetries } = options;

        const getToken = getTokenCreator({
            ClientId: 'clientId',
            ClientSecret: 'clientSecret',
            spikeURL: 'https://menash.mq',
            tokenAudience: 'baltun',
            tokenGrantType: 'client_cridentials',
            useRedis,
            redisHost: redisUri,
            spikePublicKeyFullPath: getPublicKeyPath('new'),
            tokenRedisKeyName: 'my-nice-prefix',
            retries,
            sleepBetweenRetries,
        });

        const firstToken = await getToken();
        expect(firstToken).toEqual(getLastTokenFromSpike());

        for (let i = 0; i < 50; i++) {
            const token = await getToken();
            expect(token).toEqual(firstToken);
        }

        getToken.close();
    });
});
