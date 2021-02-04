import * as assert from 'assert';
import { URL } from 'url';
import { ISpikeOptions } from './interfaces';
import { Spike } from './spike';

export interface IDepricatedSpikeOptions {
    ClientId?: string;
    ClientSecret?: string;
    spikeURL?: string;
    tokenGrantType?: string;
    tokenAudience?: string;
    tokenRedisKeyName?: string;
    spikePublicKeyFullPath?: string;
    useRedis?: boolean;
    redisHost?: string;
}

export const getTokenCreator = (options: IDepricatedSpikeOptions) => {
    const { spikeURL, ClientId, ClientSecret, spikePublicKeyFullPath, useRedis, redisHost, tokenRedisKeyName, tokenAudience } = options;

    assert(spikeURL, 'spikeURL is a required parameter');
    assert(ClientId, 'ClientId is a required parameter');
    assert(ClientSecret, 'ClientSecret is a required parameter');
    assert(tokenAudience, 'tokenAudience is a required parameter');

    const spikeUrlObject = new URL(spikeURL);

    const spikeOptions: ISpikeOptions = {
        spike: {
            url: spikeUrlObject.origin,
            clientId: ClientId,
            clientSecret: ClientSecret,
            publicKeyFullPath: spikePublicKeyFullPath,
        },
    };

    if (useRedis) {
        assert(redisHost, `redisHost is required parameter, when useRedis selected`);

        spikeOptions.redis = {
            uri: redisHost,
            tokenKeyPrefix: tokenRedisKeyName,
        };
    }

    const spike = new Spike(spikeOptions);

    let isInitialized = false;

    const getToken = async () => {
        if (!isInitialized) {
            await spike.initialize();
            isInitialized = true;
        }

        return spike.getToken(tokenAudience);
    };

    getToken.close = () => spike.close();

    return getToken;
};
