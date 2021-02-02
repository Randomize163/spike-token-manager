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
    test: {
        spike: {
            url: env.get('SPIKE_TEST_SPIKE_URL').default('https://51.144.178.121:1337/').asString(),
            clientId: env.get('SPIKE_TEST_SPIKE_CLIENT_ID').default('9FXuQkn7m7YNjecKufGAQV2HR_Lcu7PDNhNf31Od').asString(),
            clientSecret: env
                .get('SPIKE_TEST_SPIKE_CLIENT_SECRET')
                .default('GxE6OodYjrFNdSwe4tI3zJJ5OhbNpgMc8toWyPKJ~OfkR_f21eCDyCi8CN~l709uYBLfdiYWiF8ryjlRZ_cTap108wmSMaWXdZn5')
                .asString(),
            audience: env.get('SPIKE_TEST_SPIKE_AUDIENCE').default('rabaz').asString(),
        },
    },
};

export default config;
