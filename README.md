
<a name="readmemd"></a>

spike-token-manager / [Exports](#modulesmd)

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

## API

# Classes


<a name="classeslib_spikespikemd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/spike](#moduleslib_spikemd) / Spike

# Class: Spike

[lib/spike](#moduleslib_spikemd).Spike

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [initialized](#initialized)
- [logger](#logger)
- [options](#options)
- [redis](#redis)
- [redisKey](#rediskey)
- [spikeApi](#spikeapi)
- [spikePublicKey](#spikepublickey)
- [spikeTokens](#spiketokens)

### Methods

- [close](#close)
- [createRedis](#createredis)
- [getCurrentToken](#getcurrenttoken)
- [getPublicKeyHelper](#getpublickeyhelper)
- [getToken](#gettoken)
- [getTokenFromRedis](#gettokenfromredis)
- [getTokenHelper](#gettokenhelper)
- [handleSpikeError](#handlespikeerror)
- [initialize](#initialize)
- [initializeRedis](#initializeredis)
- [isInitialized](#isinitialized)
- [isTokenValid](#istokenvalid)
- [saveToken](#savetoken)
- [spikeRequestWithRetryHelper](#spikerequestwithretryhelper)
- [stringifyOptions](#stringifyoptions)
- [transformClientIdToRedisKey](#transformclientidtorediskey)
- [updatePublicKey](#updatepublickey)
- [updateToken](#updatetoken)
- [validateToken](#validatetoken)
- [spikeRequestHelper](#spikerequesthelper)

## Constructors

### constructor

\+ **new Spike**(`options`: [*ISpikeOptions*](#interfaceslib_interfacesispikeoptionsmd)): [*Spike*](#classeslib_spikespikemd)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*ISpikeOptions*](#interfaceslib_interfacesispikeoptionsmd) |

**Returns:** [*Spike*](#classeslib_spikespikemd)

Defined in: src/lib/spike.ts:29

## Properties

### initialized

• `Private` **initialized**: *boolean*= false

Defined in: src/lib/spike.ts:29

___

### logger

• `Private` **logger**: [*ILogger*](#interfaceslib_interfacesiloggermd)

Defined in: src/lib/spike.ts:19

___

### options

• `Private` **options**: [*IValidatedSpikeOptions*](#ivalidatedspikeoptions)

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

• `Private` **spikeApi**: [*SpikeApi*](#classeslib_spike_apispikeapimd)

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

▸ `Private`**getTokenHelper**(`getTokenOptions`: [*IGetTokenOptions*](#interfaceslib_spike_apiigettokenoptionsmd)): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`getTokenOptions` | [*IGetTokenOptions*](#interfaceslib_spike_apiigettokenoptionsmd) |

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

▸ `Private`**validateToken**(`token`: *string*, `audience?`: *string*): [*ISpikeTokenParsed*](#interfaceslib_interfacesispiketokenparsedmd)

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |
`audience?` | *string* |

**Returns:** [*ISpikeTokenParsed*](#interfaceslib_interfacesispiketokenparsedmd)

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


<a name="classeslib_spike_apispikeapimd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/spike-api](#moduleslib_spike_apimd) / SpikeApi

# Class: SpikeApi

[lib/spike-api](#moduleslib_spike_apimd).SpikeApi

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [spike](#spike)

### Methods

- [getPublicKey](#getpublickey)
- [getToken](#gettoken)

## Constructors

### constructor

\+ **new SpikeApi**(`options`: AxiosRequestConfig): [*SpikeApi*](#classeslib_spike_apispikeapimd)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | AxiosRequestConfig |

**Returns:** [*SpikeApi*](#classeslib_spike_apispikeapimd)

Defined in: src/lib/spike-api.ts:15

## Properties

### spike

• `Private` **spike**: AxiosInstance

Defined in: src/lib/spike-api.ts:15

## Methods

### getPublicKey

▸ **getPublicKey**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: src/lib/spike-api.ts:21

___

### getToken

▸ **getToken**(`options`: [*IGetTokenOptions*](#interfaceslib_spike_apiigettokenoptionsmd)): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IGetTokenOptions*](#interfaceslib_spike_apiigettokenoptionsmd) |

**Returns:** *Promise*<string\>

Defined in: src/lib/spike-api.ts:28


<a name="classestests_axiosfakeaxioserrormd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [tests/axios](#modulestests_axiosmd) / FakeAxiosError

# Class: FakeAxiosError

[tests/axios](#modulestests_axiosmd).FakeAxiosError

## Hierarchy

* *Error*

  ↳ **FakeAxiosError**

## Implements

* *AxiosError*

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [code](#code)
- [config](#config)
- [isAxiosError](#isaxioserror)
- [message](#message)
- [name](#name)
- [request](#request)
- [response](#response)
- [stack](#stack)
- [prepareStackTrace](#preparestacktrace)
- [stackTraceLimit](#stacktracelimit)

### Methods

- [toJSON](#tojson)
- [captureStackTrace](#capturestacktrace)

## Constructors

### constructor

\+ **new FakeAxiosError**(`message`: *string*, `code`: *string*, `status?`: *number*): [*FakeAxiosError*](#classestests_axiosfakeaxioserrormd)

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`code` | *string* |
`status?` | *number* |

**Returns:** [*FakeAxiosError*](#classestests_axiosfakeaxioserrormd)

Defined in: src/tests/axios.ts:9

## Properties

### code

• **code**: *string*

___

### config

• **config**: AxiosRequestConfig

Defined in: src/tests/axios.ts:5

___

### isAxiosError

• **isAxiosError**: *boolean*= true

Defined in: src/tests/axios.ts:8

___

### message

• **message**: *string*

___

### name

• **name**: *string*

Defined in: src/tests/axios.ts:9

___

### request

• `Optional` **request**: *any*

Defined in: src/tests/axios.ts:6

___

### response

• `Optional` **response**: *AxiosResponse*<any\>

Defined in: src/tests/axios.ts:7

___

### stack

• `Optional` **stack**: *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Optional` `Static` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### toJSON

▸ **toJSON**(): *object*

**Returns:** *object*

Name | Type |
:------ | :------ |
`code` | *string* |

Defined in: src/tests/axios.ts:19

___

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:4


<a name="classesutilseventmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [utils](#modulesutilsmd) / Event

# Class: Event

[utils](#modulesutilsmd).Event

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [event](#event)
- [signaled](#signaled)

### Methods

- [reset](#reset)
- [signal](#signal)
- [wait](#wait)

## Constructors

### constructor

\+ **new Event**(): [*Event*](#classesutils_synceventmd)

**Returns:** [*Event*](#classesutils_synceventmd)

Defined in: src/utils/sync.ts:6

## Properties

### event

• `Private` **event**: *EventEmitter*

Defined in: src/utils/sync.ts:4

___

### signaled

• `Private` **signaled**: *boolean*= false

Defined in: src/utils/sync.ts:6

## Methods

### reset

▸ **reset**(): *void*

**Returns:** *void*

Defined in: src/utils/sync.ts:27

___

### signal

▸ **signal**(): *void*

**Returns:** *void*

Defined in: src/utils/sync.ts:12

___

### wait

▸ **wait**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: src/utils/sync.ts:19


<a name="classesutils_synceventmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [utils/sync](#modulesutils_syncmd) / Event

# Class: Event

[utils/sync](#modulesutils_syncmd).Event

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [event](#event)
- [signaled](#signaled)

### Methods

- [reset](#reset)
- [signal](#signal)
- [wait](#wait)

## Constructors

### constructor

\+ **new Event**(): [*Event*](#classesutils_synceventmd)

**Returns:** [*Event*](#classesutils_synceventmd)

Defined in: src/utils/sync.ts:6

## Properties

### event

• `Private` **event**: *EventEmitter*

Defined in: src/utils/sync.ts:4

___

### signaled

• `Private` **signaled**: *boolean*= false

Defined in: src/utils/sync.ts:6

## Methods

### reset

▸ **reset**(): *void*

**Returns:** *void*

Defined in: src/utils/sync.ts:27

___

### signal

▸ **signal**(): *void*

**Returns:** *void*

Defined in: src/utils/sync.ts:12

___

### wait

▸ **wait**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: src/utils/sync.ts:19

# Interfaces


<a name="interfaceslib_gettokencreatoridepricatedspikeoptionsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/getTokenCreator](#moduleslib_gettokencreatormd) / IDepricatedSpikeOptions

# Interface: IDepricatedSpikeOptions

[lib/getTokenCreator](#moduleslib_gettokencreatormd).IDepricatedSpikeOptions

## Table of contents

### Properties

- [ClientId](#clientid)
- [ClientSecret](#clientsecret)
- [clientId](#clientid)
- [clientSecret](#clientsecret)
- [redisHost](#redishost)
- [retries](#retries)
- [sleepBetweenRetries](#sleepbetweenretries)
- [spikePublicKeyFullPath](#spikepublickeyfullpath)
- [spikeURL](#spikeurl)
- [tokenAudience](#tokenaudience)
- [tokenGrantType](#tokengranttype)
- [tokenRedisKeyName](#tokenrediskeyname)
- [useRedis](#useredis)

## Properties

### ClientId

• `Optional` **ClientId**: *string*

Defined in: src/lib/getTokenCreator.ts:7

___

### ClientSecret

• `Optional` **ClientSecret**: *string*

Defined in: src/lib/getTokenCreator.ts:9

___

### clientId

• `Optional` **clientId**: *string*

Defined in: src/lib/getTokenCreator.ts:8

___

### clientSecret

• `Optional` **clientSecret**: *string*

Defined in: src/lib/getTokenCreator.ts:10

___

### redisHost

• `Optional` **redisHost**: *string*

Defined in: src/lib/getTokenCreator.ts:17

___

### retries

• `Optional` **retries**: *number*

Defined in: src/lib/getTokenCreator.ts:18

___

### sleepBetweenRetries

• `Optional` **sleepBetweenRetries**: *number*

Defined in: src/lib/getTokenCreator.ts:19

___

### spikePublicKeyFullPath

• `Optional` **spikePublicKeyFullPath**: *string*

Defined in: src/lib/getTokenCreator.ts:15

___

### spikeURL

• `Optional` **spikeURL**: *string*

Defined in: src/lib/getTokenCreator.ts:11

___

### tokenAudience

• `Optional` **tokenAudience**: *string*

Defined in: src/lib/getTokenCreator.ts:13

___

### tokenGrantType

• `Optional` **tokenGrantType**: *string*

Defined in: src/lib/getTokenCreator.ts:12

___

### tokenRedisKeyName

• `Optional` **tokenRedisKeyName**: *string*

Defined in: src/lib/getTokenCreator.ts:14

___

### useRedis

• `Optional` **useRedis**: *boolean*

Defined in: src/lib/getTokenCreator.ts:16


<a name="interfaceslib_interfacesiloggermd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/interfaces](#moduleslib_interfacesmd) / ILogger

# Interface: ILogger

[lib/interfaces](#moduleslib_interfacesmd).ILogger

## Table of contents

### Methods

- [debug](#debug)
- [error](#error)
- [info](#info)
- [trace](#trace)
- [warn](#warn)

## Methods

### debug

▸ **debug**(`message?`: *any*, ...`optionalParams`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *any* |
`...optionalParams` | *any*[] |

**Returns:** *void*

Defined in: src/lib/interfaces.ts:13

___

### error

▸ **error**(`message?`: *any*, ...`optionalParams`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *any* |
`...optionalParams` | *any*[] |

**Returns:** *void*

Defined in: src/lib/interfaces.ts:16

___

### info

▸ **info**(`message?`: *any*, ...`optionalParams`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *any* |
`...optionalParams` | *any*[] |

**Returns:** *void*

Defined in: src/lib/interfaces.ts:14

___

### trace

▸ **trace**(`message?`: *any*, ...`optionalParams`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *any* |
`...optionalParams` | *any*[] |

**Returns:** *void*

Defined in: src/lib/interfaces.ts:12

___

### warn

▸ **warn**(`message?`: *any*, ...`optionalParams`: *any*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *any* |
`...optionalParams` | *any*[] |

**Returns:** *void*

Defined in: src/lib/interfaces.ts:15


<a name="interfaceslib_interfacesiredisoptionsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/interfaces](#moduleslib_interfacesmd) / IRedisOptions

# Interface: IRedisOptions

[lib/interfaces](#moduleslib_interfacesmd).IRedisOptions

## Hierarchy

* *Omit*<Redis.RedisOptions, *lazyConnect*\>

  ↳ **IRedisOptions**

## Table of contents

### Properties

- [autoResendUnfulfilledCommands](#autoresendunfulfilledcommands)
- [autoResubscribe](#autoresubscribe)
- [connectTimeout](#connecttimeout)
- [connectionName](#connectionname)
- [db](#db)
- [dropBufferSupport](#dropbuffersupport)
- [enableAutoPipelining](#enableautopipelining)
- [enableOfflineQueue](#enableofflinequeue)
- [enableReadyCheck](#enablereadycheck)
- [enableTLSForSentinelMode](#enabletlsforsentinelmode)
- [family](#family)
- [host](#host)
- [keepAlive](#keepalive)
- [keyPrefix](#keyprefix)
- [maxRetriesPerRequest](#maxretriesperrequest)
- [name](#name)
- [natMap](#natmap)
- [password](#password)
- [path](#path)
- [port](#port)
- [preferredSlaves](#preferredslaves)
- [readOnly](#readonly)
- [role](#role)
- [sentinelPassword](#sentinelpassword)
- [sentinelTLS](#sentineltls)
- [sentinelUsername](#sentinelusername)
- [sentinels](#sentinels)
- [showFriendlyErrorStack](#showfriendlyerrorstack)
- [tls](#tls)
- [tokenKeyPrefix](#tokenkeyprefix)
- [updateSentinels](#updatesentinels)
- [uri](#uri)
- [username](#username)

### Methods

- [reconnectOnError](#reconnectonerror)
- [retryStrategy](#retrystrategy)
- [sentinelRetryStrategy](#sentinelretrystrategy)

## Properties

### autoResendUnfulfilledCommands

• `Optional` **autoResendUnfulfilledCommands**: *boolean*

If true, client will resend unfulfilled commands(e.g. block commands) in the previous connection when reconnected.
default: true.

Defined in: node_modules/@types/ioredis/index.d.ts:1760

___

### autoResubscribe

• `Optional` **autoResubscribe**: *boolean*

After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
default: true.

Defined in: node_modules/@types/ioredis/index.d.ts:1755

___

### connectTimeout

• `Optional` **connectTimeout**: *number*

The milliseconds before a timeout occurs during the initial connection to the Redis server.
default: 10000.

Defined in: node_modules/@types/ioredis/index.d.ts:1750

___

### connectionName

• `Optional` **connectionName**: *string*

Defined in: node_modules/@types/ioredis/index.d.ts:1696

___

### db

• `Optional` **db**: *number*

Database index to use.

Defined in: node_modules/@types/ioredis/index.d.ts:1708

___

### dropBufferSupport

• `Optional` **dropBufferSupport**: *boolean*

If you are using the hiredis parser, it's highly recommended to enable this option.
Create another instance with dropBufferSupport disabled for other commands that you want to return binary instead of string

Defined in: node_modules/@types/ioredis/index.d.ts:1808

___

### enableAutoPipelining

• `Optional` **enableAutoPipelining**: *boolean*

When enabled, all commands issued during an event loop iteration are automatically wrapped in a
pipeline and sent to the server at the same time. This can improve performance by 30-50%.
default: false.

Defined in: node_modules/@types/ioredis/index.d.ts:1818

___

### enableOfflineQueue

• `Optional` **enableOfflineQueue**: *boolean*

By default, if there is no active connection to the Redis server, commands are added to a queue
and are executed once the connection is "ready" (when enableReadyCheck is true, "ready" means
the Redis server has loaded the database from disk, otherwise means the connection to the Redis
server has been established). If this option is false, when execute the command when the connection
isn't ready, an error will be returned.

Defined in: node_modules/@types/ioredis/index.d.ts:1745

___

### enableReadyCheck

• `Optional` **enableReadyCheck**: *boolean*

When a connection is established to the Redis server, the server might still be loading
the database from disk. While loading, the server not respond to any commands.
To work around this, when this option is true, ioredis will check the status of the Redis server,
and when the Redis server is able to process commands, a ready event will be emitted.

Defined in: node_modules/@types/ioredis/index.d.ts:1715

___

### enableTLSForSentinelMode

• `Optional` **enableTLSForSentinelMode**: *boolean*

Whether to support the `tls` option when connecting to Redis via sentinel mode.
default: false.

Defined in: node_modules/@types/ioredis/index.d.ts:1787

___

### family

• `Optional` **family**: *number*

4 (IPv4) or 6 (IPv6), Defaults to 4.

Defined in: node_modules/@types/ioredis/index.d.ts:1687

___

### host

• `Optional` **host**: *string*

Defined in: node_modules/@types/ioredis/index.d.ts:1683

___

### keepAlive

• `Optional` **keepAlive**: *number*

TCP KeepAlive on the socket with a X ms delay before start. Set to a non-number value to disable keepAlive.

Defined in: node_modules/@types/ioredis/index.d.ts:1695

___

### keyPrefix

• `Optional` **keyPrefix**: *string*

Defined in: node_modules/@types/ioredis/index.d.ts:1716

___

### maxRetriesPerRequest

• `Optional` **maxRetriesPerRequest**: *null* \| *number*

By default, all pending commands will be flushed with an error every
20 retry attempts. That makes sure commands won't wait forever when
the connection is down. You can change this behavior by setting
`maxRetriesPerRequest`.

Set maxRetriesPerRequest to `null` to disable this behavior, and
every command will wait forever until the connection is alive again
(which is the default behavior before ioredis v4).

Defined in: node_modules/@types/ioredis/index.d.ts:1732

___

### name

• `Optional` **name**: *string*

default: null.

Defined in: node_modules/@types/ioredis/index.d.ts:1770

___

### natMap

• `Optional` **natMap**: NatMap

NAT map for sentinel connector.
default: null.

Defined in: node_modules/@types/ioredis/index.d.ts:1793

___

### password

• `Optional` **password**: *string*

If set, client will send AUTH command with the value of this option when connected.

Defined in: node_modules/@types/ioredis/index.d.ts:1704

___

### path

• `Optional` **path**: *string*

Local domain socket path. If set the port, host and family will be ignored.

Defined in: node_modules/@types/ioredis/index.d.ts:1691

___

### port

• `Optional` **port**: *number*

Defined in: node_modules/@types/ioredis/index.d.ts:1682

___

### preferredSlaves

• `Optional` **preferredSlaves**: (`slaves`: AddressFromResponse[]) => *null* \| AddressFromResponse \| { `ip`: *string* ; `port`: *string* ; `prio?`: *number*  }[] \| { `ip`: *string* ; `port`: *string* ; `prio?`: *number*  }

Can be used to prefer a particular slave or set of slaves based on priority.

Defined in: node_modules/@types/ioredis/index.d.ts:1782

___

### readOnly

• `Optional` **readOnly**: *boolean*

Enable READONLY mode for the connection. Only available for cluster mode.
default: false.

Defined in: node_modules/@types/ioredis/index.d.ts:1803

___

### role

• `Optional` **role**: *master* \| *slave*

default: "master".

Defined in: node_modules/@types/ioredis/index.d.ts:1766

___

### sentinelPassword

• `Optional` **sentinelPassword**: *string*

Defined in: node_modules/@types/ioredis/index.d.ts:1772

___

### sentinelTLS

• `Optional` **sentinelTLS**: SecureContextOptions

Defined in: node_modules/@types/ioredis/index.d.ts:1788

___

### sentinelUsername

• `Optional` **sentinelUsername**: *string*

Defined in: node_modules/@types/ioredis/index.d.ts:1771

___

### sentinels

• `Optional` **sentinels**: { `host`: *string* ; `port`: *number*  }[]

Defined in: node_modules/@types/ioredis/index.d.ts:1773

___

### showFriendlyErrorStack

• `Optional` **showFriendlyErrorStack**: *boolean*

Whether to show a friendly error stack. Will decrease the performance significantly.

Defined in: node_modules/@types/ioredis/index.d.ts:1812

___

### tls

• `Optional` **tls**: ConnectionOptions

Defined in: node_modules/@types/ioredis/index.d.ts:1762

___

### tokenKeyPrefix

• `Optional` **tokenKeyPrefix**: *string*

Defined in: src/lib/interfaces.ts:6

___

### updateSentinels

• `Optional` **updateSentinels**: *boolean*

Update the given `sentinels` list with new IP addresses when communicating with existing sentinels.
default: true.

Defined in: node_modules/@types/ioredis/index.d.ts:1798

___

### uri

• **uri**: *string*

Defined in: src/lib/interfaces.ts:5

___

### username

• `Optional` **username**: *string*

If set, client will send AUTH command with the value of this option as the first argument when connected. The `password` option must be set too. Username should only be set for Redis >=6.

Defined in: node_modules/@types/ioredis/index.d.ts:1700

## Methods

### reconnectOnError

▸ `Optional`**reconnectOnError**(`error`: Error): *boolean* \| *1* \| *2*

1/true means reconnect, 2 means reconnect and resend failed command. Returning false will ignore
the error and do nothing.

#### Parameters:

Name | Type |
:------ | :------ |
`error` | Error |

**Returns:** *boolean* \| *1* \| *2*

Defined in: node_modules/@types/ioredis/index.d.ts:1737

___

### retryStrategy

▸ `Optional`**retryStrategy**(`times`: *number*): *null* \| *number* \| *void*

When the return value isn't a number, ioredis will stop trying to reconnect.
Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858

#### Parameters:

Name | Type |
:------ | :------ |
`times` | *number* |

**Returns:** *null* \| *number* \| *void*

Defined in: node_modules/@types/ioredis/index.d.ts:1721

___

### sentinelRetryStrategy

▸ `Optional`**sentinelRetryStrategy**(`times`: *number*): *null* \| *number* \| *void*

If `sentinelRetryStrategy` returns a valid delay time, ioredis will try to reconnect from scratch.
default: function(times) { return Math.min(times * 10, 1000); }

#### Parameters:

Name | Type |
:------ | :------ |
`times` | *number* |

**Returns:** *null* \| *number* \| *void*

Defined in: node_modules/@types/ioredis/index.d.ts:1778


<a name="interfaceslib_interfacesispikeoptionsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/interfaces](#moduleslib_interfacesmd) / ISpikeOptions

# Interface: ISpikeOptions

[lib/interfaces](#moduleslib_interfacesmd).ISpikeOptions

## Table of contents

### Properties

- [logger](#logger)
- [redis](#redis)
- [spike](#spike)
- [token](#token)

## Properties

### logger

• `Optional` **logger**: [*ILogger*](#interfaceslib_interfacesiloggermd)

Defined in: src/lib/interfaces.ts:31

___

### redis

• `Optional` **redis**: [*IRedisOptions*](#interfaceslib_interfacesiredisoptionsmd)

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


<a name="interfaceslib_interfacesispiketokenparsedmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/interfaces](#moduleslib_interfacesmd) / ISpikeTokenParsed

# Interface: ISpikeTokenParsed

[lib/interfaces](#moduleslib_interfacesmd).ISpikeTokenParsed

## Table of contents

### Properties

- [aud](#aud)
- [clientId](#clientid)
- [clientName](#clientname)
- [exp](#exp)
- [iat](#iat)
- [iss](#iss)
- [scope](#scope)
- [sub](#sub)

## Properties

### aud

• **aud**: *string*

Defined in: src/lib/interfaces.ts:37

___

### clientId

• **clientId**: *string*

Defined in: src/lib/interfaces.ts:40

___

### clientName

• **clientName**: *string*

Defined in: src/lib/interfaces.ts:41

___

### exp

• **exp**: *number*

Defined in: src/lib/interfaces.ts:43

___

### iat

• **iat**: *number*

Defined in: src/lib/interfaces.ts:42

___

### iss

• **iss**: *string*

Defined in: src/lib/interfaces.ts:44

___

### scope

• **scope**: *string*[]

Defined in: src/lib/interfaces.ts:39

___

### sub

• **sub**: *string*

Defined in: src/lib/interfaces.ts:38


<a name="interfaceslib_spike_apiigettokenoptionsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib/spike-api](#moduleslib_spike_apimd) / IGetTokenOptions

# Interface: IGetTokenOptions

[lib/spike-api](#moduleslib_spike_apimd).IGetTokenOptions

## Table of contents

### Properties

- [audience](#audience)
- [clientId](#clientid)
- [clientSecret](#clientsecret)

## Properties

### audience

• **audience**: *string*

Defined in: src/lib/spike-api.ts:9

___

### clientId

• **clientId**: *string*

Defined in: src/lib/spike-api.ts:10

___

### clientSecret

• **clientSecret**: *string*

Defined in: src/lib/spike-api.ts:11


<a name="modulesmd"></a>

[spike-token-manager](#readmemd) / Exports

# spike-token-manager

## Table of contents

### Modules

- [config](#modulesconfigmd)
- [examples](#modulesexamplesmd)
- [lib](#moduleslibmd)
- [lib/getTokenCreator](#moduleslib_gettokencreatormd)
- [lib/interfaces](#moduleslib_interfacesmd)
- [lib/spike](#moduleslib_spikemd)
- [lib/spike-api](#moduleslib_spike_apimd)
- [lib/validations](#moduleslib_validationsmd)
- [tests/axios](#modulestests_axiosmd)
- [tests/depricated.spec](#modulestests_depricated_specmd)
- [tests/intergation.spec](#modulestests_intergation_specmd)
- [tests/spike.spec](#modulestests_spike_specmd)
- [tests/spikeApiMock](#modulestests_spikeapimockmd)
- [tests/utils/index.spec](#modulestests_utils_index_specmd)
- [tests/utils/string.spec](#modulestests_utils_string_specmd)
- [tests/utils/sync.spec](#modulestests_utils_sync_specmd)
- [utils](#modulesutilsmd)
- [utils/string](#modulesutils_stringmd)
- [utils/sync](#modulesutils_syncmd)

# Modules


<a name="modulesconfigmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / config

# Module: config

## Table of contents

### Variables

- [default](#default)

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


<a name="modulesexamplesmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / examples

# Module: examples


<a name="moduleslibexport_md"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / [lib](#moduleslibmd) / export%3D

# Namespace: export=

[lib](#moduleslibmd).export=

## Table of contents

### Type aliases

- [Spike](#spike)

### Variables

- [Spike](#spike)

## Type aliases

### Spike

Ƭ **Spike**: [*Spike*](#classeslib_spikespikemd)

Defined in: src/lib/index.ts:11

## Variables

### Spike

• **Spike**: *typeof* [*Spike*](#classeslib_spikespikemd)

Defined in: src/lib/index.ts:12


<a name="moduleslibmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib

# Module: lib

## Table of contents

### Namespaces

- [export&#x3D;](#moduleslibexport_md)

### Functions

- [export&#x3D;](#export&#x3D;)

## Functions

### export&#x3D;

▸ **export=**(`options`: [*IDepricatedSpikeOptions*](#interfaceslib_gettokencreatoridepricatedspikeoptionsmd)): *function*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IDepricatedSpikeOptions*](#interfaceslib_gettokencreatoridepricatedspikeoptionsmd) |

**Returns:** () => *Promise*<string\>

Name | Type |
:------ | :------ |
`close` | () => *void* |

Defined in: src/lib/index.ts:5


<a name="moduleslib_gettokencreatormd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib/getTokenCreator

# Module: lib/getTokenCreator

## Table of contents

### Interfaces

- [IDepricatedSpikeOptions](#interfaceslib_gettokencreatoridepricatedspikeoptionsmd)

### Functions

- [getTokenCreator](#gettokencreator)

## Functions

### getTokenCreator

▸ `Const`**getTokenCreator**(`options`: [*IDepricatedSpikeOptions*](#interfaceslib_gettokencreatoridepricatedspikeoptionsmd)): *function*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IDepricatedSpikeOptions*](#interfaceslib_gettokencreatoridepricatedspikeoptionsmd) |

**Returns:** () => *Promise*<string\>

Name | Type |
:------ | :------ |
`close` | () => *void* |

Defined in: src/lib/getTokenCreator.ts:22


<a name="moduleslib_interfacesmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib/interfaces

# Module: lib/interfaces

## Table of contents

### Interfaces

- [ILogger](#interfaceslib_interfacesiloggermd)
- [IRedisOptions](#interfaceslib_interfacesiredisoptionsmd)
- [ISpikeOptions](#interfaceslib_interfacesispikeoptionsmd)
- [ISpikeTokenParsed](#interfaceslib_interfacesispiketokenparsedmd)

### Type aliases

- [ISpikeRetryOptions](#ispikeretryoptions)
- [IValidatedSpikeOptions](#ivalidatedspikeoptions)

## Type aliases

### ISpikeRetryOptions

Ƭ **ISpikeRetryOptions**: *Omit*<pRetry.Options, *unref* \| *onFailedAttempt*\>

Defined in: src/lib/interfaces.ts:9

___

### IValidatedSpikeOptions

Ƭ **IValidatedSpikeOptions**: [*ISpikeOptions*](#interfaceslib_interfacesispikeoptionsmd) & { `logger`: [*ILogger*](#interfaceslib_interfacesiloggermd) ; `token`: { `expirationOffset`: *number*  }  }

Defined in: src/lib/interfaces.ts:34


<a name="moduleslib_spikemd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib/spike

# Module: lib/spike

## Table of contents

### Classes

- [Spike](#classeslib_spikespikemd)


<a name="moduleslib_spike_apimd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib/spike-api

# Module: lib/spike-api

## Table of contents

### Classes

- [SpikeApi](#classeslib_spike_apispikeapimd)

### Interfaces

- [IGetTokenOptions](#interfaceslib_spike_apiigettokenoptionsmd)


<a name="moduleslib_validationsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / lib/validations

# Module: lib/validations

## Table of contents

### Variables

- [ioredisConfigSchema](#ioredisconfigschema)
- [loggerSchema](#loggerschema)
- [mainSpikeConfigSchema](#mainspikeconfigschema)
- [redisConfigSchema](#redisconfigschema)
- [retryOptionsSchema](#retryoptionsschema)
- [spikeConfigSchema](#spikeconfigschema)
- [tokenConfigSchema](#tokenconfigschema)

### Functions

- [validateOptions](#validateoptions)

## Variables

### ioredisConfigSchema

• `Const` **ioredisConfigSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:30

___

### loggerSchema

• `Const` **loggerSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:66

___

### mainSpikeConfigSchema

• `Const` **mainSpikeConfigSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:74

___

### redisConfigSchema

• `Const` **redisConfigSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:61

___

### retryOptionsSchema

• `Const` **retryOptionsSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:8

___

### spikeConfigSchema

• `Const` **spikeConfigSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:18

___

### tokenConfigSchema

• `Const` **tokenConfigSchema**: *ObjectSchema*<any\>

Defined in: src/lib/validations.ts:26

## Functions

### validateOptions

▸ `Const`**validateOptions**(`options`: [*ISpikeOptions*](#interfaceslib_interfacesispikeoptionsmd)): [*IValidatedSpikeOptions*](#ivalidatedspikeoptions)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*ISpikeOptions*](#interfaceslib_interfacesispikeoptionsmd) |

**Returns:** [*IValidatedSpikeOptions*](#ivalidatedspikeoptions)

Defined in: src/lib/validations.ts:81


<a name="modulestests_axiosmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/axios

# Module: tests/axios

## Table of contents

### Classes

- [FakeAxiosError](#classestests_axiosfakeaxioserrormd)


<a name="modulestests_depricated_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/depricated.spec

# Module: tests/depricated.spec


<a name="modulestests_intergation_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/intergation.spec

# Module: tests/intergation.spec


<a name="modulestests_spike_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/spike.spec

# Module: tests/spike.spec


<a name="modulestests_spikeapimockmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/spikeApiMock

# Module: tests/spikeApiMock

## Table of contents

### Functions

- [createSpikeMockImplementation](#createspikemockimplementation)

## Functions

### createSpikeMockImplementation

▸ `Const`**createSpikeMockImplementation**(`mockedSpikeApi`: *MockedObject*<*typeof* [*SpikeApi*](#classeslib_spike_apispikeapimd)\>, `publicKeyPrefix`: *string*): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`mockedSpikeApi` | *MockedObject*<*typeof* [*SpikeApi*](#classeslib_spike_apispikeapimd)\> |
`publicKeyPrefix` | *string* |

**Returns:** *object*

Name | Type |
:------ | :------ |
`getKeys` | (`type`: *old* \| *new*) => *KeyPairSyncResult*<string, string\> |
`getLastTokenFromSpike` | () => *string* |
`getPublicKeyMock` | *Mock*<any, any\> |
`getPublicKeyPath` | (`type`: *string*) => *undefined* \| *string* |
`getTokenMock` | *Mock*<any, any\> |
`removeTemporaryFiles` | () => *void* |

Defined in: src/tests/spikeApiMock.ts:9


<a name="modulestests_utils_index_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/utils/index.spec

# Module: tests/utils/index.spec


<a name="modulestests_utils_string_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/utils/string.spec

# Module: tests/utils/string.spec


<a name="modulestests_utils_sync_specmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / tests/utils/sync.spec

# Module: tests/utils/sync.spec


<a name="modulesutilsmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / utils

# Module: utils

## Table of contents

### Classes

- [Event](#classesutilseventmd)

### Functions

- [promisePipe](#promisepipe)
- [stringify](#stringify)
- [trycatch](#trycatch)
- [trycatchSync](#trycatchsync)

## Functions

### promisePipe

▸ `Const`**promisePipe**(`stream1`: NodeJS.ReadableStream, `stream2`: NodeJS.WritableStream): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`stream1` | NodeJS.ReadableStream |
`stream2` | NodeJS.WritableStream |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

▸ `Const`**promisePipe**(`stream1`: NodeJS.ReadableStream, `stream2`: NodeJS.ReadWriteStream, `stream3`: NodeJS.WritableStream): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`stream1` | NodeJS.ReadableStream |
`stream2` | NodeJS.ReadWriteStream |
`stream3` | NodeJS.WritableStream |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

▸ `Const`**promisePipe**(`stream1`: NodeJS.ReadableStream, `stream2`: NodeJS.ReadWriteStream, `stream3`: NodeJS.ReadWriteStream, `stream4`: NodeJS.WritableStream): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`stream1` | NodeJS.ReadableStream |
`stream2` | NodeJS.ReadWriteStream |
`stream3` | NodeJS.ReadWriteStream |
`stream4` | NodeJS.WritableStream |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

▸ `Const`**promisePipe**(`stream1`: NodeJS.ReadableStream, `stream2`: NodeJS.ReadWriteStream, `stream3`: NodeJS.ReadWriteStream, `stream4`: NodeJS.ReadWriteStream, `stream5`: NodeJS.WritableStream): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`stream1` | NodeJS.ReadableStream |
`stream2` | NodeJS.ReadWriteStream |
`stream3` | NodeJS.ReadWriteStream |
`stream4` | NodeJS.ReadWriteStream |
`stream5` | NodeJS.WritableStream |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

▸ `Const`**promisePipe**(`streams`: *ReadonlyArray*<NodeJS.ReadableStream \| NodeJS.WritableStream \| NodeJS.ReadWriteStream\>): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`streams` | *ReadonlyArray*<NodeJS.ReadableStream \| NodeJS.WritableStream \| NodeJS.ReadWriteStream\> |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

▸ `Const`**promisePipe**(`stream1`: NodeJS.ReadableStream, `stream2`: NodeJS.ReadWriteStream \| NodeJS.WritableStream, ...`streams`: (NodeJS.ReadWriteStream \| NodeJS.WritableStream)[]): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`stream1` | NodeJS.ReadableStream |
`stream2` | NodeJS.ReadWriteStream \| NodeJS.WritableStream |
`...streams` | (NodeJS.ReadWriteStream \| NodeJS.WritableStream)[] |

**Returns:** *Promise*<void\>

Defined in: src/utils/index.ts:6

___

### stringify

▸ `Const`**stringify**(`object`: *any*, `space?`: *number*, `replacer?`: ReplacerFunction): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`object` | *any* | - |
`space` | *number* | 2 |
`replacer?` | ReplacerFunction | - |

**Returns:** *string*

Defined in: src/utils/index.ts:56

___

### trycatch

▸ `Const`**trycatch**(`func`: Function, ...`args`: *any*[]): *Promise*<{ `err?`: *any* ; `result?`: *any*  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`func` | Function |
`...args` | *any*[] |

**Returns:** *Promise*<{ `err?`: *any* ; `result?`: *any*  }\>

Defined in: src/utils/index.ts:8

___

### trycatchSync

▸ `Const`**trycatchSync**(`func`: Function, ...`args`: *any*[]): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`func` | Function |
`...args` | *any*[] |

**Returns:** *object*

Name | Type |
:------ | :------ |
`err`? | *any* |
`result`? | *any* |

Defined in: src/utils/index.ts:20


<a name="modulesutils_stringmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / utils/string

# Module: utils/string

## Table of contents

### Functions

- [stringToBase64](#stringtobase64)

## Functions

### stringToBase64

▸ `Const`**stringToBase64**(`data`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *string*

Defined in: src/utils/string.ts:1


<a name="modulesutils_syncmd"></a>

[spike-token-manager](#readmemd) / [Exports](#modulesmd) / utils/sync

# Module: utils/sync

## Table of contents

### Classes

- [Event](#classesutils_synceventmd)
