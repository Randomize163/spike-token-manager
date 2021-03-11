[spike-token-manager](../README.md) / [Exports](../modules.md) / config

# Module: config

## Table of contents

### Variables

- [default](config.md#default)

## Variables

### default

• `Const` **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`jwt` | *object* |
`jwt.expirationOffset` | *number* |
`redis` | *object* |
`redis.maxRetriesPerRequest` | *number* |
`redis.retryStrategy` | (`retryCount`: *number*) => *number* |
`spike` | *object* |
`spike.getTokenRoute` | *string* |
`spike.publicKeyRoute` | *string* |
`spike.responseAbortStatuses` | *number*[] |
`spike.retryOptions` | *object* |
`spike.retryOptions.maxRetryTime` | *number* |
`spike.retryOptions.maxTimeout` | *number* |
`spike.retryOptions.minTimeout` | *number* |
`spike.retryOptions.retries` | *number* |
`spike.tokenGrantType` | *string* |
`test` | *object* |
`test.spike` | *object* |
`test.spike.audience` | *string* |
`test.spike.clientId` | *string* |
`test.spike.clientSecret` | *string* |
`test.spike.url` | *string* |

Defined in: src/config/index.ts:5
