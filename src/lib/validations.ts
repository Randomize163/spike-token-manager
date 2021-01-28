import * as Joi from 'joi';

import { ISpikeOptions } from './interfaces';

export const spikeConfigSchema = Joi.object({
    url: Joi.string().uri().required(),
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    tokenAudience: Joi.string().required(),
    publicKeyFullPath: Joi.string(),
});

export const tokenConfigSchema = Joi.object({
    expirationOffset: Joi.number().optional(),
});

export const ioredisConfigSchema = Joi.object({}).unknown();

export const redisConfigSchema = ioredisConfigSchema.keys({
    uri: Joi.string().uri().required(),
    tokenKeyName: Joi.string().required(),
});

export const mainSpikeConfigSchema = Joi.object({
    spike: spikeConfigSchema.required(),
    redis: redisConfigSchema.optional(),
    token: tokenConfigSchema.optional(),
});

export const validateConfig = (config: ISpikeOptions) => {
    return Joi.attempt(config, mainSpikeConfigSchema);
};
