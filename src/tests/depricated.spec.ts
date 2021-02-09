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

    it.each([[{ useRedis: false }], [{ useRedis: true }]])('should getToken() with options: %j', async (options) => {
        jest.setTimeout(10 * 1000);

        const { useRedis } = options;

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
