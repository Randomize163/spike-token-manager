# Spike Token Manager

**Spike Token Manager** is an easy to use package for managing Spike tokens for multiple audiences and clients.

## Features

### On the fly Spike Public Key update

No need to specify a static public key. Public key is updated automatically.

### Redis auto-reconnect and spike requests retries

_Spike Token Manager_ automatically reconnects to Redis in case of failures. When Spike is unavailible _Spike Token Manager_ will retry it's requests and ensure that you'll get your token.

### Configurable custom logger

Use logger of your choice and get all of your logs in one place.

### Compact storage for Redis tokens

_Spike Token Manager_ uses Redis HASH for compact storage of your tokens.

### Expiration offset configuration

When network is slow, race conditions are possible.

Example:
You have a token, that will expire in 10 seconds.
When you get a token, it is still valid, but when your request reaches the destination the token is expired and your request will fail.

_Spike Token Manager_ solves this issue by configuring _"token expiration offset"_. Your token will be renewed before it get's close to it's expiration time.

### Great defaults with high level of customization

You could configure almost everything, from complicated redis settings to exponential backoff retry options.

### Backward compatible with [spike-get-token](https://www.npmjs.com/package/spike-get-token)

_Spike Token Manager_ is backwards compatible with [spike-get-token](https://www.npmjs.com/package/spike-get-token).
You could use the same old syntax to make the transition to the new package easy.

```typescript
import * as getTokenCreator from 'spike-token-manager';

const getToken = getTokenCreator({
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    spikeURL: 'https://spike.url',
    tokenAudience: 'baltun',
    tokenGrantType: 'client_cridentials',
    useRedis: true,
    redisHost: 'redis://redis',
    spikePublicKeyFullPath: './publicKey.pem',
    tokenRedisKeyName: 'my-nice-prefix',
    retries: 3,
    sleepBetweenRetries: 1000,
});

const firstToken = await getToken();
```

## Usage examples:

### Usage with redis

```ts
import { Spike } from 'spike-token-manager';

const spike = new Spike({
    spike: {
        url: 'https://51.144.178.121:1337',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
    },
    redis: {
        uri: 'redis://localhost',
    },
});

const driveToken = await spike.getToken('drive');
const phonebookToken = await spike.getToken('phonebook');
```

### Usage without redis

```ts
import { Spike } from 'spike-token-manager';

const spike = new Spike({
    spike: {
        url: 'https://51.144.178.121:1337',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
    },
});
```
