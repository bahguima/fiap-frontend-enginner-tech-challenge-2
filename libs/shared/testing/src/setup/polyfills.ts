import { Blob, File } from "node:buffer";
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";
import { BroadcastChannel } from "node:worker_threads";

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds: number[] = [];

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}

Object.defineProperties(globalThis, {
  Blob: { value: Blob, configurable: true },
  BroadcastChannel: { value: BroadcastChannel, configurable: true },
  File: { value: File, configurable: true },
  IntersectionObserver: {
    value: MockIntersectionObserver,
    configurable: true,
  },
  ReadableStream: { value: ReadableStream, configurable: true },
  TextDecoder: { value: TextDecoder, configurable: true },
  TextEncoder: { value: TextEncoder, configurable: true },
  TransformStream: { value: TransformStream, configurable: true },
  WritableStream: { value: WritableStream, configurable: true },
});
