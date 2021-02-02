import { stringToBase64 } from '../../utils/string';

const stringExample =
    'Decoding Base64 string is quite similar to encoding it. You have to create a new buffer object and pass two parameters to its constructor. The first parameter is the data in Base64 and second parameter is "base64". Then you simply have to call "toString" on the buffer object but this time the parameter passed to the method will be "ascii" because this is the data type that you want your Base64 data to convert to. Take a look at the following code snippet for reference.';

const stringBase64 =
    'RGVjb2RpbmcgQmFzZTY0IHN0cmluZyBpcyBxdWl0ZSBzaW1pbGFyIHRvIGVuY29kaW5nIGl0LiBZb3UgaGF2ZSB0byBjcmVhdGUgYSBuZXcgYnVmZmVyIG9iamVjdCBhbmQgcGFzcyB0d28gcGFyYW1ldGVycyB0byBpdHMgY29uc3RydWN0b3IuIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgdGhlIGRhdGEgaW4gQmFzZTY0IGFuZCBzZWNvbmQgcGFyYW1ldGVyIGlzICJiYXNlNjQiLiBUaGVuIHlvdSBzaW1wbHkgaGF2ZSB0byBjYWxsICJ0b1N0cmluZyIgb24gdGhlIGJ1ZmZlciBvYmplY3QgYnV0IHRoaXMgdGltZSB0aGUgcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgbWV0aG9kIHdpbGwgYmUgImFzY2lpIiBiZWNhdXNlIHRoaXMgaXMgdGhlIGRhdGEgdHlwZSB0aGF0IHlvdSB3YW50IHlvdXIgQmFzZTY0IGRhdGEgdG8gY29udmVydCB0by4gVGFrZSBhIGxvb2sgYXQgdGhlIGZvbGxvd2luZyBjb2RlIHNuaXBwZXQgZm9yIHJlZmVyZW5jZS4=';

describe('stringToBase64() tests', () => {
    it('should convert string to Base64', () => {
        const base64 = stringToBase64(stringExample);

        expect(base64).toBe(stringBase64);

        const translated = Buffer.from(base64, 'base64').toString('utf-8');

        expect(translated).toBe(stringExample);
    });
});
