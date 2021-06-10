import * as Redis from 'ioredis';
import { stringify } from '../../utils';
import { ILogger, IRedisOptions } from '../interfaces';

import { Storage } from './interface';

export type IRedisStorageOptions = Omit<IRedisOptions, 'tokenKeyPrefix'> & { hashKeyName: string };

export class RedisStorage implements Storage {
    private redis: Redis.Redis;

    constructor(private options: IRedisStorageOptions, private logger: ILogger) {
        const { uri, hashKeyName, ...redisOptions } = options;

        this.redis = new Redis(uri, redisOptions);

        this.redis
            .on('error', (error: Error) => {
                this.logger.error(`[Spike] Got redis error: ${stringify(error)}`);
            })
            .on('connect', () => {
                this.logger.info(`[Spike] Connected to Redis`);
            })
            .on('ready', () => {
                this.logger.info(`[Spike] Redis is ready to receive commands`);
            })
            .on('reconnecting', (timeout: number) => {
                this.logger.info(`[Spike] Redis reconnecting in ${timeout} ms`);
            });
    }

    // eslint-disable-next-line class-methods-use-this
    public async initialize() {
        // no need for special initialization for now
    }

    public async close() {
        this.redis.disconnect();
    }

    public get(key: string): Promise<string | null> {
        return this.redis.hget(this.options.hashKeyName, key);
    }

    public async set(key: string, value: string): Promise<void> {
        await this.redis.hset(this.options.hashKeyName, key, value);
    }
}
