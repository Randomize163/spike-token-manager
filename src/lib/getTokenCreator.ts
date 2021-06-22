import * as assert from 'assert';
import { URL } from 'url';
import { ISpikeOptions } from './interfaces';
import { Spike } from './spike';

export interface IDepricatedSpikeOptions {
    ClientId?: string;
    clientId?: string;
    ClientSecret?: string;
    clientSecret?: string;
    spikeURL?: string;
    tokenGrantType?: string;
    tokenAudience?: string;
    tokenRedisKeyName?: string;
    spikePublicKeyFullPath?: string;
    useRedis?: boolean;
    redisHost?: string;
    retries?: number;
    sleepBetweenRetries?: number;
}

export const getTokenCreator = (options: IDepricatedSpikeOptions) => {
    const {
        spikeURL,
        clientId,
        ClientId,
        clientSecret,
        ClientSecret,
        spikePublicKeyFullPath,
        useRedis,
        redisHost,
        tokenRedisKeyName,
        tokenAudience,
        retries,
        sleepBetweenRetries,
    } = options;

    const clientIdOption = clientId || ClientId;
    const clientSecretOption = clientSecret || ClientSecret;

    assert(spikeURL, 'spikeURL is a required parameter');
    assert(clientIdOption, 'clientId is a required parameter');
    assert(clientSecretOption, 'clientSecret is a required parameter');
    assert(tokenAudience, 'tokenAudience is a required parameter');

    const spikeUrlObject = new URL(spikeURL);

    const spikeOptions: ISpikeOptions = {
        spike: {
            url: spikeUrlObject.origin,
            clientId: clientIdOption,
            clientSecret: clientSecretOption,
            publicKeyFullPath: spikePublicKeyFullPath,
        },
    };

    if (retries || sleepBetweenRetries) {
        spikeOptions.spike.retryOptions = {
            retries,
            minTimeout: sleepBetweenRetries,
        };
    }

    if (useRedis) {
        assert(redisHost, `redisHost is required parameter, when useRedis selected`);

        spikeOptions.redis = {
            uri: redisHost,
            keyPrefix: tokenRedisKeyName,
        };
    }

    const spike = new Spike(spikeOptions);

    const getToken = async () => spike.getToken(tokenAudience);
    getToken.close = () => spike.close();

    return getToken;
};
