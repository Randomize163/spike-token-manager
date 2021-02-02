import Redis from 'ioredis';
import pRetry from 'p-retry';

export interface IRedisOptions extends Redis.RedisOptions {
    uri: string;
    tokenKeyPrefix?: string;
}

export type ISpikeRetryOptions = Omit<pRetry.Options, 'unref' | 'onFailedAttempt'>;

export interface ILogger {
    trace(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export interface ISpikeOptions {
    spike: {
        url: string;
        clientId: string;
        clientSecret: string;
        publicKeyFullPath?: string;
        retryOptions?: ISpikeRetryOptions;
    };
    redis?: IRedisOptions;
    token?: {
        expirationOffset?: number;
    };
    logger?: ILogger;
}

export type IValidatedSpikeOptions = ISpikeOptions & { logger: ILogger };

export interface ISpikeTokenParsed {
    aud: string;
    sub: string;
    scope: string[];
    clientId: string;
    clientName: string;
    iat: number;
    exp: number;
    iss: string;
}
