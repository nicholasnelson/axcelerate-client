# axcelerate-client

TypeScript client for the aXcelerate API. Server-only. Node 18+.

**API Reference**: https://app.axcelerate.com/apidocs/home

## Features

* Small HTTP layer using native `fetch`
* Zod-validated request and response types
* Classful resources mounted on a single client
* ESM and CJS builds
* Testable with Undici `MockAgent`

## Install

```bash
npm i axcelerate-client
# or for development of this repo
npm i
```

## Requirements

* Node 18+
* Server environment only. Do not ship keys to browsers.

## Quick start

```ts
import { AxcelerateClient } from "axcelerate-client";

const ax = new AxcelerateClient({
  apiToken: process.env.AXCELERATE_API_TOKEN as string,
  wsToken: process.env.AXCELERATE_WS_TOKEN as string,
  baseUrl: "https://yourinstance.app.axcelerate.com/api/",
});
```

### Courses

```ts
// List
const list = await ax.courses.list({ limit: 10 });
// Get by ID
const one = await ax.courses.get(list[0].ID);
```

### Course detail

```ts
const detail = await ax.courseDetail.get({ id: 4539, type: "p" });
// detail.TYPE narrows the union: "p" | "w" | "el"
```

### Course instances

```ts
const instances = await ax.courseInstances.list({
  id: 16380,
  type: "w",
  public: false,
  current: false,
});
```

### Enrol

```ts
const enrol = await ax.courseEnrol.enrol({
  contactID: 952989,
  instanceID: 407209,
  type: "w",
  tentative: true,
  generateInvoice: true,
  // optional custom fields:
  customFields: { cohort: "C" },
});
```

## Error handling

All non-2xx responses throw `ApiError` with `status`, `url`, and body text.
Zod schema mismatches throw `ZodError`.

```ts
import { ApiError } from "axcelerate-client";

try {
  await ax.courseDetail.get({ id: 1, type: "p" });
} catch (e) {
  if (e instanceof ApiError) {
    console.error(e.status, e.message);
  }
}
```

## Testing

Uses Vitest and Undici `MockAgent`.

```ts
// tests/setup.ts
import { MockAgent, setGlobalDispatcher } from "undici";
const mock = new MockAgent();
mock.disableNetConnect();
setGlobalDispatcher(mock);
export const mockApi = (base: string) => ({ pool: mock.get(base), mock });
```

```ts
// example test
import { AxcelerateClient } from "../src/client";
import { mockApi } from "./setup";

const base = "https://api.axcelerate.com";
const { pool } = mockApi(base);
pool.intercept({ method: "GET", path: "/v2/courses?limit=1" })
    .reply(200, [{ ROWID:1, ID:101, COUNT:1, NAME:"Test", STREAMNAME:null, CODE:"T1", COST:0, GST_TYPE:0, DELIVERY:"Online", DURATION:0, DURATIONTYPE:null, ISACTIVE:true, TYPE:"w", SHORTDESCRIPTION:null, PRIMARYIMAGE:null, SECONDARYIMAGE:null, LASTUPDATEDUTC:"2021-03-16 23:40" }], { headers: { "content-type": "application/json" } });

const ax = new AxcelerateClient({ apiToken:"x", wsToken:"y", baseUrl: base + "/v2/" });
const out = await ax.courses.list({ limit: 1 });
```

Run:

```bash
npm test
```

## Build

`tsup` builds ESM and CJS with types.

```bash
npm run build
```

## API surface

* `new AxcelerateClient({ apiToken, wsToken, baseUrl, fetchImpl? })`
* `client.courses.list(q?)`
* `client.courses.get(id)`
* `client.courseDetail.get({ id, type })`
* `client.courseInstances.list({ id, type, ...filters })`
* `client.courseEnrol.enrol(payload)`

## Notes

* Dates are strings as returned by the API. Validation tolerates `YYYY-MM-DD hh:mm` where applicable.

## Contributing

* Keep endpoints small and validated.
* Add fixtures for tests. Prefer Undici `MockAgent`.

## License

MIT.
