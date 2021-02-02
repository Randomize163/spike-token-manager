import * as jwt from 'jsonwebtoken';
import { SpikeApi } from '../lib/spike-api';

import config from '../config';
import { ISpikeTokenParsed } from '../lib/interfaces';

const {
    test: { spike },
} = config;

describe('integration tests', () => {
    const spikeApi = new SpikeApi({
        baseURL: spike.url,
    });

    it('should get public key', async () => {
        const publicKey = await spikeApi.getPublicKey();
        const expected = expect.stringMatching(/^-----BEGIN PUBLIC KEY-----.*-----END PUBLIC KEY-----.?/s);
        expect(publicKey).toEqual(expected);
    });

    it('should get token', async () => {
        const { audience, clientId, clientSecret } = spike;
        const token = await spikeApi.getToken({ audience, clientId, clientSecret });
        const publicKey = await spikeApi.getPublicKey();

        const parsedToken = jwt.verify(token, publicKey, { audience }) as ISpikeTokenParsed;
        expect(parsedToken.scope).toBeDefined();
        expect(parsedToken.scope.length).toBeGreaterThanOrEqual(1);
        expect(parsedToken.aud).toEqual(audience);
        expect(parsedToken.clientId).toEqual(clientId);
    });
});
