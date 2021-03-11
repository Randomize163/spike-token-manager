[spike-token-manager](../README.md) / [Exports](../modules.md) / [lib/spike](../modules/lib_spike.md) / Spike

# Class: Spike

[lib/spike](../modules/lib_spike.md).Spike

## Table of contents

### Constructors

- [constructor](lib_spike.spike.md#constructor)

### Properties

- [initialized](lib_spike.spike.md#initialized)
- [logger](lib_spike.spike.md#logger)
- [options](lib_spike.spike.md#options)
- [redis](lib_spike.spike.md#redis)
- [redisKey](lib_spike.spike.md#rediskey)
- [spikeApi](lib_spike.spike.md#spikeapi)
- [spikePublicKey](lib_spike.spike.md#spikepublickey)
- [spikeTokens](lib_spike.spike.md#spiketokens)

### Methods

- [close](lib_spike.spike.md#close)
- [createRedis](lib_spike.spike.md#createredis)
- [getCurrentToken](lib_spike.spike.md#getcurrenttoken)
- [getPublicKeyHelper](lib_spike.spike.md#getpublickeyhelper)
- [getToken](lib_spike.spike.md#gettoken)
- [getTokenFromRedis](lib_spike.spike.md#gettokenfromredis)
- [getTokenHelper](lib_spike.spike.md#gettokenhelper)
- [handleSpikeError](lib_spike.spike.md#handlespikeerror)
- [initialize](lib_spike.spike.md#initialize)
- [initializeRedis](lib_spike.spike.md#initializeredis)
- [isInitialized](lib_spike.spike.md#isinitialized)
- [isTokenValid](lib_spike.spike.md#istokenvalid)
- [saveToken](lib_spike.spike.md#savetoken)
- [spikeRequestWithRetryHelper](lib_spike.spike.md#spikerequestwithretryhelper)
- [stringifyOptions](lib_spike.spike.md#stringifyoptions)
- [transformClientIdToRedisKey](lib_spike.spike.md#transformclientidtorediskey)
- [updatePublicKey](lib_spike.spike.md#updatepublickey)
- [updateToken](lib_spike.spike.md#updatetoken)
- [validateToken](lib_spike.spike.md#validatetoken)
- [spikeRequestHelper](lib_spike.spike.md#spikerequesthelper)

## Constructors

### constructor

\+ **new Spike**(`options`: [*ISpikeOptions*](../interfaces/lib_interfaces.ispikeoptions.md)): [*Spike*](lib_spike.spike.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*ISpikeOptions*](../interfaces/lib_interfaces.ispikeoptions.md) |

**Returns:** [*Spike*](lib_spike.spike.md)

Defined in: src/lib/spike.ts:29

## Properties

### initialized

• `Private` **initialized**: *boolean*= false

Defined in: src/lib/spike.ts:29

___

### logger

• `Private` **logger**: [*ILogger*](../interfaces/lib_interfaces.ilogger.md)

Defined in: src/lib/spike.ts:19

___

### options

• `Private` **options**: [*IValidatedSpikeOptions*](../modules/lib_interfaces.md#ivalidatedspikeoptions)

Defined in: src/lib/spike.ts:17

___

### redis

• `Private` `Optional` **redis**: *Redis*

Defined in: src/lib/spike.ts:21

___

### redisKey

• `Private` **redisKey**: *string*

Defined in: src/lib/spike.ts:22

___

### spikeApi

• `Private` **spikeApi**: [*SpikeApi*](lib_spike_api.spikeapi.md)

Defined in: src/lib/spike.ts:24

___

### spikePublicKey

• `Private` **spikePublicKey**: *string*

Defined in: src/lib/spike.ts:26

___

### spikeTokens

• `Private` `Optional` **spikeTokens**: *Map*<string, string\>

Defined in: src/lib/spike.ts:27

## Methods

### close

▸ **close**(): *void*

**Returns:** *void*

Defined in: src/lib/spike.ts:65

___

### createRedis

▸ `Private`**createRedis**(): *void*

**Returns:** *void*

Defined in: src/lib/spike.ts:144

___

### getCurrentToken

▸ `Private`**getCurrentToken**(`audience`: *string*): *Promise*<undefined \| *null* \| string\>

#### Parameters:

Name | Type |
:------ | :------ |
`audience` | *string* |

**Returns:** *Promise*<undefined \| *null* \| string\>

Defined in: src/lib/spike.ts:166

___

### getPublicKeyHelper

▸ `Private`**getPublicKeyHelper**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: src/lib/spike.ts:241

___

### getToken

▸ **getToken**(`audience`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`audience` | *string* |

**Returns:** *Promise*<string\>

Defined in: src/lib/spike.ts:83

___

### getTokenFromRedis

▸ `Private`**getTokenFromRedis**(`audience`: *string*): *Promise*<*null* \| string\>

#### Parameters:

Name | Type |
:------ | :------ |
`audience` | *string* |

**Returns:** *Promise*<*null* \| string\>

Defined in: src/lib/spike.ts:182

___

### getTokenHelper

▸ `Private`**getTokenHelper**(`getTokenOptions`: [*IGetTokenOptions*](../interfaces/lib_spike_api.igettokenoptions.md)): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`getTokenOptions` | [*IGetTokenOptions*](../interfaces/lib_spike_api.igettokenoptions.md) |

**Returns:** *Promise*<string\>

Defined in: src/lib/spike.ts:237

___

### handleSpikeError

▸ `Private`**handleSpikeError**(`error`: FailedAttemptError): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | FailedAttemptError |

**Returns:** *void*

Defined in: src/lib/spike.ts:269

___

### initialize

▸ **initialize**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: src/lib/spike.ts:47

___

### initializeRedis

▸ `Private`**initializeRedis**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: src/lib/spike.ts:128

___

### isInitialized

▸ **isInitialized**(): *boolean*

**Returns:** *boolean*

Defined in: src/lib/spike.ts:79

___

### isTokenValid

▸ `Private`**isTokenValid**(`token`: *string*, `audience?`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |
`audience?` | *string* |

**Returns:** *boolean*

Defined in: src/lib/spike.ts:104

___

### saveToken

▸ `Private`**saveToken**(`token`: *string*, `audience`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |
`audience` | *string* |

**Returns:** *Promise*<void\>

Defined in: src/lib/spike.ts:223

___

### spikeRequestWithRetryHelper

▸ `Private`**spikeRequestWithRetryHelper**(`doRequest`: Function): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`doRequest` | Function |

**Returns:** *Promise*<any\>

Defined in: src/lib/spike.ts:245

___

### stringifyOptions

▸ `Private`**stringifyOptions**(): *string*

**Returns:** *string*

Defined in: src/lib/spike.ts:109

___

### transformClientIdToRedisKey

▸ `Private`**transformClientIdToRedisKey**(`clientId`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`clientId` | *string* |

**Returns:** *string*

Defined in: src/lib/spike.ts:175

___

### updatePublicKey

▸ `Private`**updatePublicKey**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: src/lib/spike.ts:134

___

### updateToken

▸ `Private`**updateToken**(`audience`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`audience` | *string* |

**Returns:** *Promise*<void\>

Defined in: src/lib/spike.ts:191

___

### validateToken

▸ `Private`**validateToken**(`token`: *string*, `audience?`: *string*): [*ISpikeTokenParsed*](../interfaces/lib_interfaces.ispiketokenparsed.md)

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |
`audience?` | *string* |

**Returns:** [*ISpikeTokenParsed*](../interfaces/lib_interfaces.ispiketokenparsed.md)

Defined in: src/lib/spike.ts:115

___

### spikeRequestHelper

▸ `Private` `Static`**spikeRequestHelper**(`doRequest`: Function): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`doRequest` | Function |

**Returns:** *Promise*<any\>

Defined in: src/lib/spike.ts:252
