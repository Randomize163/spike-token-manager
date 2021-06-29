import * as pRetry from 'p-retry';
import Redis from '../utils/redis';

export interface IRedisOptions extends Omit<Redis.RedisOptions, 'lazyConnect'> {
    uri: string;
    keepAliveInterval?: number;
    keepAliveInitialDelay?: number;
    keepAliveProbesCount?: number;
    tcpUserTimeout?: number;
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

export type IValidatedSpikeOptions = ISpikeOptions & { logger: ILogger; token: { expirationOffset: number } };

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
