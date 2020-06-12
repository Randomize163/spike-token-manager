import * as env from 'env-var';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = {
    spike: {
        publicKeyRoute: env.get('SPIKE_PUBLIC_KEY_ROUTE').default('/.well-known/publickey.pem').asString(),
        getTokenRoute: env.get('SPIKE_GET_TOKEN_ROUTE').default('/oauth2/token').asString(),
        tokenGrantType: env.get('SPIKE_TOKEN_GRANT_TYPE').default('client_credentials').asString(),
    },
    jwt: {
        expirationOffset: env
            .get('SPIKE_DEFAULT_EXPIRATION_OFFSET')
            .default(-10 * 1000)
            .asInt(),
    },
};

export default config;
