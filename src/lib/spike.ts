import * as pRetry from 'p-retry';
import * as jwt from 'jsonwebtoken';
import * as assert from 'assert';
import * as fs from 'fs';
import { AxiosError } from 'axios';
import { IGetTokenOptions, SpikeApi } from './spike-api';
import { stringify, trycatch, trycatchSync } from '../utils';
import { ILogger, ISpikeOptions, ISpikeTokenParsed, IValidatedSpikeOptions } from './interfaces';
import { validateOptions } from './validations';

import config from '../config';
import DoOnce from '../utils/sync/limiter';
import { Storage } from './storage/interface';
import { LocalStorage } from './storage/local';
import { IRedisStorageOptions, RedisStorage } from './storage/redis';

const { spike: spikeConfig } = config;

export class Spike {
    private options: IValidatedSpikeOptions;

    private logger: ILogger;

    private spikeApi: SpikeApi;

    private spikePublicKey: string;
    private localStorage: Storage;
    private remoteStorage?: Storage;

    private initialized: boolean = false;

    private doOnce = new DoOnce();

    constructor(options: ISpikeOptions) {
        this.options = validateOptions(options);

        const { spike, redis, logger } = this.options;

        this.logger = logger;
        this.spikeApi = new SpikeApi({ baseURL: spike.url });

        this.localStorage = new LocalStorage();

        if (redis) {
            this.createRedisStorage();
        }
    }

    async initialize(): Promise<void> {
        if (this.isInitialized()) {
            return;
        }

        this.logger.debug(`[Spike] Initializing using configuration: ${this.stringifyOptions()}`);

        await this.updatePublicKey();

        await this.localStorage.initialize();
        await this.remoteStorage?.initialize();

        this.initialized = true;

        this.logger.info(`[Spike] Initialized successfully`);
    }

    async close() {
        if (!this.isInitialized()) {
            return;
        }

        await this.remoteStorage?.close();
        await this.localStorage.close();

        this.initialized = false;

        this.logger.info(`[Spike] Closed successfully`);
    }

    isInitialized() {
        return this.initialized;
    }

    async getToken(audience: string): Promise<string> {
        if (!this.isInitialized()) {
            await this.initialize();
        }

        const token = await this.getActiveToken(audience);
        if (token) {
            return token;
        }

        const newToken = await this.updateToken(audience);

        assert(newToken);
        assert(this.isTokenValid(newToken, audience));

        return newToken;
    }

    private isTokenValid(token: string, audience?: string): boolean {
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
            clockTimestamp: (Date.now() - tokenOptions.expirationOffset) / 1000,
        };

        return jwt.verify(token, this.spikePublicKey, verifyOptions) as ISpikeTokenParsed;
    }

    private async updatePublicKey() {
        const { publicKeyFullPath } = this.options.spike;

        if (publicKeyFullPath) {
            this.spikePublicKey = await fs.promises.readFile(publicKeyFullPath, { encoding: 'utf8' });
        } else {
            this.spikePublicKey = await this.getPublicKeyHelper();
        }
    }

    private createRedisStorage() {
        assert(this.options.redis);

        const { keyPrefix, ...options } = this.options.redis;
        const { clientId } = this.options.spike;

        const redisStorageOptions: IRedisStorageOptions = { ...options, hashKeyName: `${keyPrefix}${clientId}` };

        this.remoteStorage = new RedisStorage(redisStorageOptions, this.logger);
    }

    private async getActiveToken(audience: string) {
        const token = await this.localStorage.get(audience);
        if (token && this.isTokenValid(token, audience)) {
            return token;
        }

        const remoteToken = await this.remoteStorage?.get(audience);
        if (remoteToken && this.isTokenValid(remoteToken, audience)) {
            await this.localStorage.set(audience, remoteToken);
            return remoteToken;
        }

        return null;
    }

    private updateToken(audience: string) {
        return this.doOnce.run(audience, () => this.updateTokenHelper(audience));
    }

    private async updateTokenHelper(audience: string) {
        const {
            spike: { clientId, clientSecret },
        } = this.options;

        const getTokenOptions: IGetTokenOptions = {
            clientId,
            clientSecret,
            audience,
        };

        this.logger.debug(`[Spike] Updating token for audience: ${audience}`);

        const token = await this.issueNewToken(getTokenOptions);
        if (this.isTokenValid(token, audience)) {
            await this.saveToken(token, audience);
            return token;
        }

        this.logger.warn(`[Spike] Token for audience ${audience} received from Spike is not valid. Retry after updating public key.`);

        await this.updatePublicKey();
        if (this.isTokenValid(token, audience)) {
            await this.saveToken(token, audience);
            return token;
        }

        this.logger.error(`[Spike] Token for audience ${audience} received from Spike is not valid according to both old and updated public keys`);

        throw new Error(`Received Spike token is not valid according to both old and updated public keys`);
    }

    private async saveToken(token: string, audience: string) {
        await this.localStorage.set(audience, token);

        await this.remoteStorage?.set(audience, token);
    }

    private issueNewToken(getTokenOptions: IGetTokenOptions): Promise<string> {
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

        const spikeResponseAbortStatuses = spikeConfig.responseAbortStatuses;

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
