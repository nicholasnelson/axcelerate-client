# aXcelerate Client

A fully typed Node.js client for the [aXcelerate](https://axcelerate.com.au) REST API. The library wraps vendor endpoints with [ts-rest](https://ts-rest.com) contracts and [Zod](https://zod.dev) schemas so requests and responses are validated at runtime and inferred at compile time.

- **API docs:** https://app.axcelerate.com/apidocs/home
- **Requires:** Node 18 or newer (server-only usage)

## Features

- **End-to-end typing** — Request bodies, params, and responses are all backed by Zod schemas.
- **Modern HTTP stack** — Uses [`ky`](https://github.com/sindresorhus/ky) with sensible timeouts, retries, and hook support.
- **Typed resources** — Covers contacts and courses, including enrolments and course instances.
- **Runtime validation** — Normalised error handling surfaces upstream changes early.
- **Dual bundles** — Ships ESM & CJS builds with generated declaration files.

## Installation

```bash
pnpm add axcelerate-client
# or
npm install axcelerate-client
yarn add axcelerate-client
```

## Quick Start

```ts
import { createAxcelerateClient } from "axcelerate-client";

const axc = createAxcelerateClient({
  baseUrl: "https://yourorg.api.axcelerate.com.au/api/", 
  apiToken: process.env.AXCELERATE_API_TOKEN!,
  wsToken: process.env.AXCELERATE_WS_TOKEN!,
});

const result = await axc.courses.getCourses({
  query: { current: true, public: true },
});

if (result.status === 200) {
  result.body.forEach((course) => {
    console.log(`${course.name} (${course.type})`);
  });
}
```

Every router method enforces the contract defined in `src/contract`. If the upstream API changes shape, Zod validation surfaces the mismatch immediately.

### Available Endpoints

**Courses**
- `getCourses`
- `getCourseDetail`
- `getCourseInstances`
- `enrol`
- `enrolMultiple`

**Contacts**
- `createContact`, `updateContact`, `getContact`
- `searchContacts`
- `verifyUSI`
- `createContactNote`

**Organisations**
- `search`

See the fixtures and specs in `tests/` for concrete request/response examples.

## Development

```bash
pnpm install            # install dependencies
pnpm build              # emit dist/ (ESM + CJS)
pnpm test               # run the Vitest suite (uses undici MockAgent)
pnpm lint               # eslint .
pnpm format             # prettier . --write
pnpm dev                # tsup watch mode
```

## Releasing

`tsup` bundles the library and `prepare` runs the build automatically. Bump the version, run `pnpm build`, then publish with your package manager of choice.

## Contributing

Bug reports and pull requests are welcome. Please:

1. Discuss large changes in an issue first.
2. Add or update tests for behavioural changes.
3. Run `pnpm lint` and `pnpm test` before submitting.

## License

Licensed under the [MIT License](./LICENSE).
