[spike-token-manager](../README.md) / [Exports](../modules.md) / [tests/axios](../modules/tests_axios.md) / FakeAxiosError

# Class: FakeAxiosError

[tests/axios](../modules/tests_axios.md).FakeAxiosError

## Hierarchy

* *Error*

  ↳ **FakeAxiosError**

## Implements

* *AxiosError*

## Table of contents

### Constructors

- [constructor](tests_axios.fakeaxioserror.md#constructor)

### Properties

- [code](tests_axios.fakeaxioserror.md#code)
- [config](tests_axios.fakeaxioserror.md#config)
- [isAxiosError](tests_axios.fakeaxioserror.md#isaxioserror)
- [message](tests_axios.fakeaxioserror.md#message)
- [name](tests_axios.fakeaxioserror.md#name)
- [request](tests_axios.fakeaxioserror.md#request)
- [response](tests_axios.fakeaxioserror.md#response)
- [stack](tests_axios.fakeaxioserror.md#stack)
- [prepareStackTrace](tests_axios.fakeaxioserror.md#preparestacktrace)
- [stackTraceLimit](tests_axios.fakeaxioserror.md#stacktracelimit)

### Methods

- [toJSON](tests_axios.fakeaxioserror.md#tojson)
- [captureStackTrace](tests_axios.fakeaxioserror.md#capturestacktrace)

## Constructors

### constructor

\+ **new FakeAxiosError**(`message`: *string*, `code`: *string*, `status?`: *number*): [*FakeAxiosError*](tests_axios.fakeaxioserror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`code` | *string* |
`status?` | *number* |

**Returns:** [*FakeAxiosError*](tests_axios.fakeaxioserror.md)

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
