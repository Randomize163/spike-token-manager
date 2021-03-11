[spike-token-manager](../README.md) / [Exports](../modules.md) / lib/validations

# Module: lib/validations

## Table of contents

### Variables

- [ioredisConfigSchema](lib_validations.md#ioredisconfigschema)
- [loggerSchema](lib_validations.md#loggerschema)
- [mainSpikeConfigSchema](lib_validations.md#mainspikeconfigschema)
- [redisConfigSchema](lib_validations.md#redisconfigschema)
- [retryOptionsSchema](lib_validations.md#retryoptionsschema)
- [spikeConfigSchema](lib_validations.md#spikeconfigschema)
- [tokenConfigSchema](lib_validations.md#tokenconfigschema)

### Functions

- [validateOptions](lib_validations.md#validateoptions)

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

▸ `Const`**validateOptions**(`options`: [*ISpikeOptions*](../interfaces/lib_interfaces.ispikeoptions.md)): [*IValidatedSpikeOptions*](lib_interfaces.md#ivalidatedspikeoptions)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*ISpikeOptions*](../interfaces/lib_interfaces.ispikeoptions.md) |

**Returns:** [*IValidatedSpikeOptions*](lib_interfaces.md#ivalidatedspikeoptions)

Defined in: src/lib/validations.ts:81
