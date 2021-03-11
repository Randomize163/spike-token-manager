[spike-token-manager](../README.md) / [Exports](../modules.md) / [lib/spike-api](../modules/lib_spike_api.md) / SpikeApi

# Class: SpikeApi

[lib/spike-api](../modules/lib_spike_api.md).SpikeApi

## Table of contents

### Constructors

- [constructor](lib_spike_api.spikeapi.md#constructor)

### Properties

- [spike](lib_spike_api.spikeapi.md#spike)

### Methods

- [getPublicKey](lib_spike_api.spikeapi.md#getpublickey)
- [getToken](lib_spike_api.spikeapi.md#gettoken)

## Constructors

### constructor

\+ **new SpikeApi**(`options`: AxiosRequestConfig): [*SpikeApi*](lib_spike_api.spikeapi.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | AxiosRequestConfig |

**Returns:** [*SpikeApi*](lib_spike_api.spikeapi.md)

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

▸ **getToken**(`options`: [*IGetTokenOptions*](../interfaces/lib_spike_api.igettokenoptions.md)): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IGetTokenOptions*](../interfaces/lib_spike_api.igettokenoptions.md) |

**Returns:** *Promise*<string\>

Defined in: src/lib/spike-api.ts:28
