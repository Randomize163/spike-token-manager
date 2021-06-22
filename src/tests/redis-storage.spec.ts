import { RedisStorage } from '../lib/storage/redis';
import { IStorage } from '../lib/storage/interface';

describe('redis storage tests', () => {
    describe('connection tests', () => {
        let storage: IStorage;

        afterEach(async () => {
            if (storage) {
                await storage.close();
            }
        });

        it('should connect', async () => {
            storage = new RedisStorage({
                uri: 'redis://localhost',
                hashKeyName: 'test-key',
                retryStrategy: (times: number) => {
                    return Math.min(times * 500, 2000);
                },
            });

            await storage.initialize();

            const key = 'test-key';
            const value = 'test-value';

            await storage.set(key, value);

            await expect(storage.get(key)).resolves.toBe(value);
        });
    });
});
