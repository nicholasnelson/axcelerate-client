# aXcelerate Client

A fully typed Node.js client for the [aXcelerate](https://axcelerate.com.au) REST API. The library wraps vendor endpoints with [ts-rest](https://ts-rest.com) contracts and [Zod](https://zod.dev) schemas so requests and responses are validated at runtime and inferred at compile time.

- **API docs:** https://app.axcelerate.com/apidocs/home
- **Requires:** Node 22 or newer (server-only usage)

## Features

- **End-to-end typing** — Request bodies, params, and responses are all backed by Zod schemas.
- **Typed resources** — Covers contacts and courses, including enrolments and course instances.
- **Runtime validation** — Normalised error handling surfaces upstream changes early.
- **Dual bundles** — Ships ESM & CJS builds with generated declaration files.

## Installation

```bash
npm install axcelerate-client
# or
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

const result = await axc.courses.get({
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

- `courses.get`
- `courses.instance.get`
- `courses.enrol`
- `courses.enrolMultiple`
- `courses.detail.get`

**Contacts**

- `contacts.create`, `contacts.update`, `contacts.get`
- `contacts.search`
- `contacts.verifyUsi`
- `contacts.note.create`

**Organisations**

- `organisations.search`

Each action is defined in its own file under `src/contract/modules/**`, with its request/response schemas colocated in `src/schemas/**`. Query and mutation schemas conform to the shared `QueryEndpointSchemas` and `MutationEndpointSchemas` types defined in `src/schemas/meta.ts`, keeping endpoint definitions consistent across the client.

See the fixtures and specs in `tests/` for concrete request/response examples.

## Development

```bash
npm install                # install dependencies
npm run build              # emit dist/ (ESM + CJS)
npm run test               # run the Vitest suite (uses undici MockAgent)
npm run lint               # eslint .
npm run format             # prettier . --write
npm run dev                # tsup watch mode
```

## Releasing

`tsup` bundles the library and `prepare` runs the build automatically. Bump the version, run `npm build`, then publish with your package manager of choice.

## Contributing

Bug reports and pull requests are welcome. Please:

1. Discuss large changes in an issue first.
2. Add or update tests for behavioural changes.
3. Run `npm run check` and `npm run test` before submitting.

## License

Licensed under the [MIT License](./LICENSE).
