import * as Redis from 'ioredis';
import { stringify, trycatch } from '../../utils';
import { ILogger, IRedisOptions } from '../interfaces';

import { IStorage } from './interface';

export type IRedisStorageOptions = IRedisOptions & { hashKeyName: string };

export class RedisStorage implements IStorage {
    private redis: Redis.Redis;

    constructor(private options: IRedisStorageOptions, private logger: ILogger = console) {
        const { uri, hashKeyName, ...redisOptions } = options;

        this.redis = new Redis(uri, { ...redisOptions, lazyConnect: true });

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

    public async initialize() {
        const { err } = await trycatch(() => this.redis.connect());
        if (!err) {
            return;
        }

        await new Promise((resolve) => {
            this.redis.once('ready', resolve);
        });
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
