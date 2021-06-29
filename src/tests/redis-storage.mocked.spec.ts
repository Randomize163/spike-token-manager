/* eslint-disable class-methods-use-this */
import { mocked } from 'ts-jest/dist/utils/testing';
import { EventEmitter } from 'stream';
import Redis from '../utils/redis';
import { RedisStorage } from '../lib/storage/redis';
import { IStorage } from '../lib/storage/interface';

import config from '../config';

jest.mock('ioredis');

const mockedRedis = mocked(Redis);

class RedisMock extends EventEmitter {
    connect() {
        return Promise.resolve();
    }

    disconnect() {
        // empty
    }
}

describe('redis storage tests', () => {
    describe('connection tests', () => {
        let storage: IStorage;

        afterEach(async () => {
            if (storage) {
                await storage.close();
            }
        });

        it('should log errors', async () => {
            const redisInstance = new RedisMock();

            // @ts-ignore
            mockedRedis.mockImplementationOnce(() => redisInstance);

            const logger = { error: jest.fn(), info: jest.fn(), debug: jest.fn(), trace: jest.fn(), warn: jest.fn() };

            storage = new RedisStorage({ uri: 'redis://testtest', hashKeyName: 'testtest' }, logger);

            await storage.initialize();

            const testError = new Error('Test error message');
            redisInstance.emit('error', testError);

            expect(logger.error).toBeCalledTimes(1);

            const receivedLogMessage = logger.error.mock.calls[0][0];
            expect(receivedLogMessage).toContain('[Spike] Got redis error');
            expect(receivedLogMessage).toContain(testError.message);

            const testTimeout = 1000;
            redisInstance.emit('reconnecting', testTimeout);

            expect(logger.info).toBeCalledTimes(1);
            expect(logger.info.mock.calls[0][0]).toContain(`[Spike] Redis reconnecting in ${testTimeout} ms`);

            await storage.close();
        });
    });

    describe('default retryStrategy tests', () => {
        it('should retry forever', () => {
            const { retryStrategy } = config.redis;

            const expectedRetryStrategy = (retryCount: number) => Math.min(retryCount * 500, 2000);

            for (let i = 0; i < 1000; i++) {
                expect(expectedRetryStrategy(i)).toEqual(retryStrategy(i));
            }
        });
    });
});
