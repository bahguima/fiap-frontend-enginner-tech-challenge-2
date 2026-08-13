import {
  fetch,
  FormData,
  Headers,
  Request,
  Response,
} from "undici";

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  FormData: { value: FormData, configurable: true },
  Headers: { value: Headers, configurable: true },
  Request: { value: Request, configurable: true },
  Response: { value: Response, configurable: true },
});
