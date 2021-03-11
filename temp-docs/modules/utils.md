[spike-token-manager](../README.md) / [Exports](../modules.md) / utils

# Module: utils

## Table of contents

### Classes

- [Event](../classes/utils.event.md)

### Functions

- [promisePipe](utils.md#promisepipe)
- [stringify](utils.md#stringify)
- [trycatch](utils.md#trycatch)
- [trycatchSync](utils.md#trycatchsync)

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
