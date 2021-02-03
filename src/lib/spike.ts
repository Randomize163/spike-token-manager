import pRetry from 'p-retry';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { once } from 'events';
import assert from 'assert';
import * as fs from 'fs';
import { AxiosError } from 'axios';
import { IGetTokenOptions, SpikeApi } from './spike-api';
import { stringify, trycatch, trycatchSync } from '../utils';
import { ILogger, ISpikeOptions, ISpikeTokenParsed, IValidatedSpikeOptions } from './interfaces';
import { validateOptions } from './validations';

export class Spike {
    private options: IValidatedSpikeOptions;

    private logger: ILogger;

    private redis?: Redis.Redis;
    private redisKey: string;

    private spikeApi: SpikeApi;

    private spikePublicKey: string;
    private spikeTokens?: Map<string, string>;

    constructor(options: ISpikeOptions) {
        this.options = validateOptions(options);

        const { spike, redis, logger } = this.options;

        this.logger = logger;
        this.spikeApi = new SpikeApi({ baseURL: spike.url });

        if (redis) {
            this.createRedis();
            this.redisKey = this.transformClientIdToRedisKey(spike.clientId);
        } else {
            this.spikeTokens = new Map();
        }
    }

    async initialize(): Promise<void> {
        this.logger.debug(`[Spike] Initializing using configuration: ${this.stringifyOptions()}`);

        if (this.redis) {
            await this.initializeRedis();
        }

        await this.updatePublicKey();

        this.logger.info(`[Spike] Initialized successfully`);
    }

    close() {
        if (this.redis) {
            this.redis.disconnect();
        }

        this.logger.info(`[Spike] Closed successfully`);
    }

    async getToken(audience: string): Promise<string> {
        const token = await this.getCurrentToken(audience);

        if (token && this.isTokenValid(token, audience)) {
            return token;
        }

        await this.updateToken(audience);

        const newToken = await this.getCurrentToken(audience);

        assert(newToken);
        assert(this.isTokenValid(newToken, audience));

        return newToken;
    }

    isTokenValid(token: string, audience?: string): boolean {
        const { err } = trycatchSync(() => this.validateToken(token, audience));
        return !err;
    }

    private stringifyOptions = () => {
        const { logger, ...restOfOptions } = this.options;

        return stringify(restOfOptions);
    };

    private validateToken(token: string, audience?: string): ISpikeTokenParsed {
        assert(this.spikePublicKey);

        const { token: tokenOptions } = this.options;

        const verifyOptions: jwt.VerifyOptions = {
            audience,
        };

        if (tokenOptions?.expirationOffset) {
            verifyOptions.clockTimestamp = (Date.now() - tokenOptions.expirationOffset) / 1000;
        }

        return jwt.verify(token, this.spikePublicKey, verifyOptions) as ISpikeTokenParsed;
    }

    private async initializeRedis() {
        assert(this.redis);

        await once(this.redis, 'ready');

        this.logger.debug('[Spike] Connected to redis');
    }

    private async updatePublicKey() {
        const { publicKeyFullPath } = this.options.spike;

        if (publicKeyFullPath) {
            this.spikePublicKey = await fs.promises.readFile(publicKeyFullPath, { encoding: 'utf8' });
        } else {
            this.spikePublicKey = await this.getPublicKeyHelper();
        }
    }

    private createRedis() {
        assert(this.options.redis);

        const { uri, tokenKeyPrefix, ...redisOptions } = this.options.redis;

        this.redis = new Redis(uri, redisOptions);
    }

    private async getCurrentToken(audience: string) {
        if (!this.redis) {
            assert(this.spikeTokens);
            return this.spikeTokens.get(audience);
        }

        return this.getTokenFromRedis(audience);
    }

    private transformClientIdToRedisKey(clientId: string) {
        const { redis } = this.options;
        assert(redis);

        return `${redis.tokenKeyPrefix}${clientId}`;
    }

    private getTokenFromRedis(audience: string) {
        const { redis } = this.options;

        assert(redis);
        assert(this.redis);

        return this.redis.hget(this.redisKey, audience);
    }

    private async updateToken(audience: string) {
        const {
            spike: { clientId, clientSecret },
        } = this.options;

        const getTokenOptions: IGetTokenOptions = {
            clientId,
            clientSecret,
            audience,
        };

        this.logger.debug(`[Spike] Updating token for audience: ${audience}`);

        const token = await this.getTokenHelper(getTokenOptions);
        if (this.isTokenValid(token, audience)) {
            await this.saveToken(token, audience);
            return;
        }

        this.logger.warn(`[Spike] Token for audience ${audience} received from Spike is not valid. Retry after updating public key.`);

        await this.updatePublicKey();
        if (this.isTokenValid(token, audience)) {
            await this.saveToken(token, audience);
            return;
        }

        this.logger.error(`[Spike] Token for audience ${audience} received from Spike is not valid according to both old and updated public keys`);

        throw new Error(`Received Spike token is not valid according to both old and updated public keys`);
    }

    private async saveToken(token: string, audience: string) {
        if (!this.redis) {
            assert(this.spikeTokens);
            this.spikeTokens.set(audience, token);
            return;
        }

        const { redis } = this.options;

        assert(redis);

        await this.redis.hset(this.redisKey, audience, token);
    }

    private getTokenHelper(getTokenOptions: IGetTokenOptions): Promise<string> {
        return this.spikeRequestWithRetryHelper(() => this.spikeApi.getToken(getTokenOptions));
    }

    private getPublicKeyHelper(): Promise<string> {
        return this.spikeRequestWithRetryHelper(() => this.spikeApi.getPublicKey());
    }

    private async spikeRequestWithRetryHelper(doRequest: Function) {
        return pRetry(() => Spike.spikeRequestHelper(doRequest), {
            ...this.options.spike.retryOptions,
            onFailedAttempt: (err) => this.handleSpikeError(err),
        });
    }

    private static async spikeRequestHelper(doRequest: Function) {
        const { result, err } = await trycatch(doRequest);
        if (!err) {
            return result;
        }

        const axiosError = err as AxiosError;

        const spikeResponseAbortStatuses = [400, 401, 429];

        if (axiosError.isAxiosError && axiosError.response && spikeResponseAbortStatuses.includes(axiosError.response.status)) {
            throw new pRetry.AbortError(err);
        }

        throw err;
    }

    private handleSpikeError(error: pRetry.FailedAttemptError) {
        const { attemptNumber, retriesLeft } = error;

        const retryCount = attemptNumber + retriesLeft;

        this.logger.warn(`[Spike] Request to spike (${attemptNumber}/${retryCount}) failed with error: ${stringify(error)}`);
    }
}
