/* istanbul ignore file */
/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { IGetTokenOptions, SpikeApi } from '../lib/spike-api';

export const createSpikeMockImplementation = (mockedSpikeApi: MockedObject<typeof SpikeApi>, publicKeyPrefix: string) => {
    const publicKeyFolderPath = `./src/tests/static`;
    const newPublicKeyPath = `${publicKeyFolderPath}/${publicKeyPrefix}publickey.pem`;
    const oldPublicKeyPath = `${publicKeyFolderPath}/${publicKeyPrefix}publickey_old.pem`;

    const generateKeysPair = () => {
        const keys = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'passphrase',
            },
        });

        return keys;
    };

    const oldKeys = generateKeysPair();
    const keys = generateKeysPair();

    const getKeys = (type: 'old' | 'new') => (type === 'new' ? keys : oldKeys);

    fs.mkdirSync(publicKeyFolderPath, { recursive: true });
    fs.writeFileSync(newPublicKeyPath, keys.publicKey);
    fs.writeFileSync(oldPublicKeyPath, oldKeys.publicKey);

    const removeTemporaryFiles = () => {
        fs.unlinkSync(oldPublicKeyPath);
        fs.unlinkSync(newPublicKeyPath);
    };

    const getPublicKeyPath = (type: string) => {
        switch (type) {
            case 'old':
                return oldPublicKeyPath;

            case 'new':
                return newPublicKeyPath;

            case 'none':
                return undefined;

            default:
                throw new Error(`Unknown key type`);
        }
    };

    let lastTokenFromSpike: string;

    const getLastTokenFromSpike = () => lastTokenFromSpike;

    const getPublicKeyMock = jest.fn().mockImplementation(async () => {
        return keys.publicKey;
    });

    const getTokenMock = jest.fn().mockImplementation((options: IGetTokenOptions) => {
        const payload = {
            clientId: options.clientId,
            clientName: 'testClientName',
            scope: ['get', 'set'],
        };

        const token = jwt.sign(
            payload,
            { key: keys.privateKey, passphrase: 'passphrase' },
            { audience: options.audience, expiresIn: '1h', algorithm: 'RS256' },
        );

        lastTokenFromSpike = token;

        return token;
    });

    mockedSpikeApi.mockImplementation(() => {
        return ({
            getToken: getTokenMock,
            getPublicKey: getPublicKeyMock,
        } as unknown) as SpikeApi;
    });

    return {
        getPublicKeyPath,
        getKeys,
        getLastTokenFromSpike,
        removeTemporaryFiles,
        getPublicKeyMock,
        getTokenMock,
    };
};
