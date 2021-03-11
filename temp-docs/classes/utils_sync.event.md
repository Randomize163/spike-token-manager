[spike-token-manager](../README.md) / [Exports](../modules.md) / [utils/sync](../modules/utils_sync.md) / Event

# Class: Event

[utils/sync](../modules/utils_sync.md).Event

## Table of contents

### Constructors

- [constructor](utils_sync.event.md#constructor)

### Properties

- [event](utils_sync.event.md#event)
- [signaled](utils_sync.event.md#signaled)

### Methods

- [reset](utils_sync.event.md#reset)
- [signal](utils_sync.event.md#signal)
- [wait](utils_sync.event.md#wait)

## Constructors

### constructor

\+ **new Event**(): [*Event*](utils_sync.event.md)

**Returns:** [*Event*](utils_sync.event.md)

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
