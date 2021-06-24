import * as Joi from 'joi';
import config from '../config';

import { ISpikeOptions, IValidatedSpikeOptions } from './interfaces';

const { redis, jwt, spike } = config;

export const retryOptionsSchema = Joi.object({
    forever: Joi.boolean().default(false),
    maxRetryTime: Joi.number().default(spike.retryOptions.maxRetryTime),
    retries: Joi.number().default(spike.retryOptions.retries),
    factor: Joi.number().default(2),
    minTimeout: Joi.number().default(spike.retryOptions.minTimeout),
    maxTimeout: Joi.number().default(spike.retryOptions.maxTimeout),
    randomize: Joi.boolean().default(false),
});

export const spikeConfigSchema = Joi.object({
    url: Joi.string().uri().required(),
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    publicKeyFullPath: Joi.string(),
    retryOptions: retryOptionsSchema.default(),
});

export const tokenConfigSchema = Joi.object({
    expirationOffset: Joi.number().default(jwt.expirationOffset),
});

export const ioredisConfigSchema = Joi.object({
    port: Joi.number(),
    host: Joi.string(),
    family: Joi.string(),
    path: Joi.string(),

    // keep-alive and tcp options
    keepAliveInterval: Joi.number().integer().default(1000),
    keepAliveInitialDelay: Joi.number().integer().default(1000),
    keepAliveProbesCount: Joi.number().integer().default(3),
    tcpUserTimeout: Joi.number().integer().default(1000),

    noDelay: Joi.boolean(),
    connectionName: Joi.string(),
    db: Joi.number(),
    username: Joi.string(),
    password: Joi.string(),
    dropBufferSupport: Joi.boolean(),
    enableReadyCheck: Joi.boolean(),
    enableOfflineQueue: Joi.boolean(),
    connectTimeout: Joi.number(),
    disconnectTimeout: Joi.number().default(redis.disconnectTimeout),
    commandTimeout: Joi.number().default(redis.commandTimeout),
    autoResubscribe: Joi.boolean(),
    autoResendUnfulfilledCommands: Joi.boolean(),
    // lazyConnect: Joi.boolean(), // Do not allow to set lazyConnect to work correctly with initialize()
    tls: Joi.object(),
    keyPrefix: Joi.string().allow('').default('spike-tokens-for-clientId-'),
    retryStrategy: Joi.function()
        .arity(1)
        .default(() => redis.retryStrategy),
    maxRetriesPerRequest: Joi.number().default(redis.maxRetriesPerRequest),
    reconnectOnError: Joi.function().arity(1),
    readOnly: Joi.boolean(),
    stringNumbers: Joi.boolean(),
    enableAutoPipelining: Joi.boolean(),
    autoPipeliningIgnoredCommands: Joi.array().items(Joi.string()),
    maxScriptsCachingTime: Joi.number(),
});

export const redisConfigSchema = ioredisConfigSchema.keys({
    uri: Joi.string().uri().required(),
});

export const loggerSchema = Joi.object({
    trace: Joi.function().required(),
    debug: Joi.function().required(),
    info: Joi.function().required(),
    warn: Joi.function().required(),
    error: Joi.function().required(),
}).unknown();

export const mainSpikeConfigSchema = Joi.object({
    spike: spikeConfigSchema.required(),
    redis: redisConfigSchema,
    token: tokenConfigSchema.default(),
    logger: loggerSchema.default(console),
});

export const validateOptions = (options: ISpikeOptions): IValidatedSpikeOptions => {
    return Joi.attempt(options, mainSpikeConfigSchema, { convert: true });
};
