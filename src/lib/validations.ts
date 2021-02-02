import * as Joi from 'joi';
import config from '../config';

import { ISpikeOptions, IValidatedSpikeOptions } from './interfaces';

export const retryOptionsSchema = Joi.object({
    forever: Joi.boolean().default(false),
    maxRetryTime: Joi.number().default(Infinity),
    retries: Joi.number().default(10),
    factor: Joi.number().default(2),
    minTimeout: Joi.number().default(1000),
    maxTimeout: Joi.number().default(Infinity),
    randomize: Joi.boolean().default(false),
});

export const spikeConfigSchema = Joi.object({
    url: Joi.string().uri().required(),
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    publicKeyFullPath: Joi.string(),
    retryOptions: retryOptionsSchema,
});

export const tokenConfigSchema = Joi.object({
    expirationOffset: Joi.number().default(config.jwt.expirationOffset),
});

export const ioredisConfigSchema = Joi.object({
    port: Joi.number().default(6379),
    host: Joi.string().default('localhost'),
    family: Joi.string().default('4'),
    path: Joi.string().default(null),
    keepAlive: Joi.number().default(0),
    noDelay: Joi.boolean().default(true),
    connectionName: Joi.string().default(null),
    db: Joi.number().default(0),
    password: Joi.string().default(null),
    dropBufferSupport: Joi.boolean().default(false),
    enableReadyCheck: Joi.boolean().default(true),
    enableOfflineQueue: Joi.boolean().default(true),
    connectTimeout: Joi.number().default(10000),
    autoResubscribe: Joi.boolean().default(true),
    autoResendUnfulfilledCommands: Joi.boolean().default(true),
    lazyConnect: Joi.boolean().default(false),
    tls: Joi.object(),
    keyPrefix: Joi.string().default(''),
    retryStrategy: Joi.function().arity(1),
    maxRetriesPerRequest: Joi.number().default(20),
    reconnectOnError: Joi.function().arity(1),
    readOnly: Joi.boolean().default(false),
    stringNumbers: Joi.boolean().default(false),
    enableAutoPipelining: Joi.boolean().default(false),
    autoPipeliningIgnoredCommands: Joi.array().items(Joi.string()).default([]),
    maxScriptsCachingTime: Joi.number().default(60000),
});

export const redisConfigSchema = ioredisConfigSchema.keys({
    uri: Joi.string().uri().required(),
    tokenKeyPrefix: Joi.string().allow('').default('spike-tokens-for-clientId-'),
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
    redis: redisConfigSchema.optional(),
    token: tokenConfigSchema.optional(),
    logger: loggerSchema.default(console),
});

export const validateOptions = (options: ISpikeOptions): IValidatedSpikeOptions => {
    return Joi.attempt(options, mainSpikeConfigSchema, { convert: true });
};
