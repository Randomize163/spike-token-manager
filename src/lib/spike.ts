import * as pRetry from 'p-retry';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { once } from 'events';
import assert from 'assert';
import * as fs from 'fs';
import { SpikeApi } from './spike-api';
import { trycatchSync } from '../utils';

export interface ISpikeOptions {
    spike: {
        url: string;
        clientId: string;
        clientSecret: string;
        tokenAudience: string;
        publicKeyFullPath?: string;
    };
    redis?: {
        uri: string;
        tokenKeyName: string;
    };
    retry?: pRetry.Options;
    expirationOffset?: number;
}

export class Spike {
    private redis?: Redis.Redis;

    private spikeApi: SpikeApi;

    private spikePublicKey: string;
    private spikeToken?: string;

    constructor(private options: ISpikeOptions) {
        // validate options and add default for expirationOffset

        const { spike } = this.options;

        this.spikeApi = new SpikeApi({ baseURL: spike.url });

        if (this.options.redis) {
            this.redis = new Redis(this.options.redis.uri);
        }
    }

    async initialize(): Promise<void> {
        if (this.redis) {
            await once(this.redis, 'ready');
        }

        await this.updatePublicKey();

        await this.getToken();
    }

    async updatePublicKey() {
        const { publicKeyFullPath } = this.options.spike;

        if (publicKeyFullPath) {
            this.spikePublicKey = await fs.promises.readFile(publicKeyFullPath, { encoding: 'utf8' });
        } else {
            this.spikePublicKey = await this.spikeApi.getPublicKey();
        }
    }

    async getToken(): Promise<string> {
        const token = await this.getCurrentToken();

        if (token && this.isTokenValid(token)) {
            return token;
        }

        await this.updateToken();

        const newToken = await this.getCurrentToken();

        assert(newToken);
        assert(this.isTokenValid(newToken));

        return newToken;
    }

    private async getCurrentToken() {
        if (!this.redis) {
            return this.spikeToken;
        }

        return this.getTokenFromRedis();
    }

    private getTokenFromRedis() {
        const { redis } = this.options;

        assert(redis);
        assert(this.redis);

        return this.redis.get(redis.tokenKeyName);
    }

    private isTokenValid(token: string): boolean {
        assert(this.spikePublicKey);

        const { spike, expirationOffset } = this.options;

        const verifyOptions: jwt.VerifyOptions = {
            audience: spike.tokenAudience,
        };

        if (expirationOffset) {
            verifyOptions.clockTimestamp = (Date.now() - expirationOffset) / 1000;
        }

        const { err } = trycatchSync(() => jwt.verify(token, this.spikePublicKey, verifyOptions));
        if (err) {
            // TODO: add more handling and check result
            return false;
        }

        return true;
    }

    private async updateToken() {
        const {
            spike: { clientId, clientSecret, tokenAudience },
        } = this.options;

        const getTokenOptions = {
            clientId,
            clientSecret,
            audience: tokenAudience,
        };

        const token = await this.spikeApi.getToken(getTokenOptions);
        if (this.isTokenValid(token)) {
            await this.saveToken(token);
            return;
        }

        await this.updatePublicKey();
        if (this.isTokenValid(token)) {
            await this.saveToken(token);
            return;
        }

        throw new Error(`Received token is not valid according to both old and updated public keys`);
    }

    private async saveToken(token: string) {
        if (!this.redis) {
            this.spikeToken = token;
            return;
        }

        const { redis } = this.options;

        assert(redis);

        await this.redis.set(redis.tokenKeyName, token);
    }
}
