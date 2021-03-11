[spike-token-manager](../README.md) / [Exports](../modules.md) / [lib/interfaces](../modules/lib_interfaces.md) / ISpikeOptions

# Interface: ISpikeOptions

[lib/interfaces](../modules/lib_interfaces.md).ISpikeOptions

## Table of contents

### Properties

- [logger](lib_interfaces.ispikeoptions.md#logger)
- [redis](lib_interfaces.ispikeoptions.md#redis)
- [spike](lib_interfaces.ispikeoptions.md#spike)
- [token](lib_interfaces.ispikeoptions.md#token)

## Properties

### logger

• `Optional` **logger**: [*ILogger*](lib_interfaces.ilogger.md)

Defined in: src/lib/interfaces.ts:31

___

### redis

• `Optional` **redis**: [*IRedisOptions*](lib_interfaces.iredisoptions.md)

Defined in: src/lib/interfaces.ts:27

___

### spike

• **spike**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`clientId` | *string* |
`clientSecret` | *string* |
`publicKeyFullPath`? | *string* |
`retryOptions`? | *Pick*<Options, *forever* \| *maxRetryTime* \| *retries* \| *factor* \| *minTimeout* \| *maxTimeout* \| *randomize*\> |
`url` | *string* |

Defined in: src/lib/interfaces.ts:20

___

### token

• `Optional` **token**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`expirationOffset`? | *number* |

Defined in: src/lib/interfaces.ts:28
