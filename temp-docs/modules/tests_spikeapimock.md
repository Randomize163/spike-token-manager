[spike-token-manager](../README.md) / [Exports](../modules.md) / tests/spikeApiMock

# Module: tests/spikeApiMock

## Table of contents

### Functions

- [createSpikeMockImplementation](tests_spikeapimock.md#createspikemockimplementation)

## Functions

### createSpikeMockImplementation

▸ `Const`**createSpikeMockImplementation**(`mockedSpikeApi`: *MockedObject*<*typeof* [*SpikeApi*](../classes/lib_spike_api.spikeapi.md)\>, `publicKeyPrefix`: *string*): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`mockedSpikeApi` | *MockedObject*<*typeof* [*SpikeApi*](../classes/lib_spike_api.spikeapi.md)\> |
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
