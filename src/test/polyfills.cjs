const { Blob, File } = require("node:buffer");
const { ReadableStream, TransformStream, WritableStream } = require("node:stream/web");
const { TextDecoder, TextEncoder } = require("node:util");

class MockBroadcastChannel extends EventTarget {
  constructor(name) {
    super();
    this.name = name;
    this.onmessage = null;
    this.onmessageerror = null;
  }

  postMessage() {}
  close() {}
}

class MockMessagePort extends EventTarget {
  postMessage() {}
  close() {}
  start() {}
  ref() {}
  unref() {}
}

Object.defineProperties(globalThis, {
  Blob: { value: Blob },
  BroadcastChannel: { value: MockBroadcastChannel },
  File: { value: File },
  MessagePort: { value: MockMessagePort },
  ReadableStream: { value: ReadableStream },
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  TransformStream: { value: TransformStream },
  WritableStream: { value: WritableStream },
});

const { fetch, FormData, Headers, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  FormData: { value: FormData, writable: true, configurable: true },
  Headers: { value: Headers, writable: true, configurable: true },
  Request: { value: Request, writable: true, configurable: true },
  Response: { value: Response, writable: true, configurable: true },
});
