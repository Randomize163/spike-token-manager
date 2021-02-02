import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import assert from 'assert';
import config from '../config';
import { stringToBase64 } from '../utils/string';

const { spike } = config;

export interface IGetTokenOptions {
    audience: string;
    clientId: string;
    clientSecret: string;
}

export class SpikeApi {
    private spike: AxiosInstance;

    constructor(private options: AxiosRequestConfig) {
        this.spike = axios.create(this.options);
    }

    async getPublicKey() {
        const response = await this.spike.get(spike.publicKeyRoute);
        const publicKey = response.data;

        return publicKey;
    }

    async getToken(options: IGetTokenOptions): Promise<string> {
        const { audience, clientId, clientSecret } = options;

        const response = await this.spike.post(
            spike.getTokenRoute,
            {
                grant_type: spike.tokenGrantType,
                audience,
            },
            {
                headers: {
                    Authorization: `Basic ${stringToBase64(`${clientId}:${clientSecret}`)}`,
                },
            },
        );

        const token = response.data.access_token;
        assert(token, `No token in Spike response`);

        return token;
    }
}
