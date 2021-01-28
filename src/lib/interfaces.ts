import Redis from 'ioredis';

export interface IRedisOptions extends Redis.RedisOptions {
    uri: string;
    tokenKeyName: string;
}

export interface ISpikeOptions {
    spike: {
        url: string;
        clientId: string;
        clientSecret: string;
        tokenAudience: string;
        publicKeyFullPath?: string;
    };
    redis?: IRedisOptions;
    token?: {
        expirationOffset?: number;
    };
}
