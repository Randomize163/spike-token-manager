[spike-token-manager](../README.md) / [Exports](../modules.md) / [lib/interfaces](../modules/lib_interfaces.md) / IRedisOptions

# Interface: IRedisOptions

[lib/interfaces](../modules/lib_interfaces.md).IRedisOptions

## Hierarchy

* *Omit*<Redis.RedisOptions, *lazyConnect*\>

  ↳ **IRedisOptions**

## Table of contents

### Properties

- [autoResendUnfulfilledCommands](lib_interfaces.iredisoptions.md#autoresendunfulfilledcommands)
- [autoResubscribe](lib_interfaces.iredisoptions.md#autoresubscribe)
- [connectTimeout](lib_interfaces.iredisoptions.md#connecttimeout)
- [connectionName](lib_interfaces.iredisoptions.md#connectionname)
- [db](lib_interfaces.iredisoptions.md#db)
- [dropBufferSupport](lib_interfaces.iredisoptions.md#dropbuffersupport)
- [enableAutoPipelining](lib_interfaces.iredisoptions.md#enableautopipelining)
- [enableOfflineQueue](lib_interfaces.iredisoptions.md#enableofflinequeue)
- [enableReadyCheck](lib_interfaces.iredisoptions.md#enablereadycheck)
- [enableTLSForSentinelMode](lib_interfaces.iredisoptions.md#enabletlsforsentinelmode)
- [family](lib_interfaces.iredisoptions.md#family)
- [host](lib_interfaces.iredisoptions.md#host)
- [keepAlive](lib_interfaces.iredisoptions.md#keepalive)
- [keyPrefix](lib_interfaces.iredisoptions.md#keyprefix)
- [maxRetriesPerRequest](lib_interfaces.iredisoptions.md#maxretriesperrequest)
- [name](lib_interfaces.iredisoptions.md#name)
- [natMap](lib_interfaces.iredisoptions.md#natmap)
- [password](lib_interfaces.iredisoptions.md#password)
- [path](lib_interfaces.iredisoptions.md#path)
- [port](lib_interfaces.iredisoptions.md#port)
- [preferredSlaves](lib_interfaces.iredisoptions.md#preferredslaves)
- [readOnly](lib_interfaces.iredisoptions.md#readonly)
- [role](lib_interfaces.iredisoptions.md#role)
- [sentinelPassword](lib_interfaces.iredisoptions.md#sentinelpassword)
- [sentinelTLS](lib_interfaces.iredisoptions.md#sentineltls)
- [sentinelUsername](lib_interfaces.iredisoptions.md#sentinelusername)
- [sentinels](lib_interfaces.iredisoptions.md#sentinels)
- [showFriendlyErrorStack](lib_interfaces.iredisoptions.md#showfriendlyerrorstack)
- [tls](lib_interfaces.iredisoptions.md#tls)
- [tokenKeyPrefix](lib_interfaces.iredisoptions.md#tokenkeyprefix)
- [updateSentinels](lib_interfaces.iredisoptions.md#updatesentinels)
- [uri](lib_interfaces.iredisoptions.md#uri)
- [username](lib_interfaces.iredisoptions.md#username)

### Methods

- [reconnectOnError](lib_interfaces.iredisoptions.md#reconnectonerror)
- [retryStrategy](lib_interfaces.iredisoptions.md#retrystrategy)
- [sentinelRetryStrategy](lib_interfaces.iredisoptions.md#sentinelretrystrategy)

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
