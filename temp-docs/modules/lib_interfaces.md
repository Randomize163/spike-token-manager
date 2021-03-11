[spike-token-manager](../README.md) / [Exports](../modules.md) / lib/interfaces

# Module: lib/interfaces

## Table of contents

### Interfaces

- [ILogger](../interfaces/lib_interfaces.ilogger.md)
- [IRedisOptions](../interfaces/lib_interfaces.iredisoptions.md)
- [ISpikeOptions](../interfaces/lib_interfaces.ispikeoptions.md)
- [ISpikeTokenParsed](../interfaces/lib_interfaces.ispiketokenparsed.md)

### Type aliases

- [ISpikeRetryOptions](lib_interfaces.md#ispikeretryoptions)
- [IValidatedSpikeOptions](lib_interfaces.md#ivalidatedspikeoptions)

## Type aliases

### ISpikeRetryOptions

Ƭ **ISpikeRetryOptions**: *Omit*<pRetry.Options, *unref* \| *onFailedAttempt*\>

Defined in: src/lib/interfaces.ts:9

___

### IValidatedSpikeOptions

Ƭ **IValidatedSpikeOptions**: [*ISpikeOptions*](../interfaces/lib_interfaces.ispikeoptions.md) & { `logger`: [*ILogger*](../interfaces/lib_interfaces.ilogger.md) ; `token`: { `expirationOffset`: *number*  }  }

Defined in: src/lib/interfaces.ts:34
