# axcelerate-client

TypeScript client for the aXcelerate API. Server-only. Node 18+.

**API Reference**: https://app.axcelerate.com/apidocs/home

## Features

- Small HTTP layer using native `fetch`
- Zod-validated request and response types
- Classful resources mounted on a single client
- ESM and CJS builds
- Testable with Undici `MockAgent`

## Install

```bash
npm i axcelerate-client
# or for development of this repo
npm i
```

## Requirements

- Node 18+
- Server environment only. Do not ship keys to browsers.

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
// List 10 courses
const list = await ax.courses.list({ displayLength: 10 });
```

### Course detail

```ts
const detail = await ax.course.getDetail({ ID: 999, type: "p" });
```

### Course instances

```ts
const instances = await ax.course.instance.list({
	ID: 999,
	type: "w",
});
```

### Enrol

```ts
const enrolResult = await client.course.enrolment.create({
	contactID: 123,
	instanceID: 999,
	type: "w",
	tentative: true,
	generateInvoice: true,
});
```

## Error handling

All non-2xx responses throw `ApiError` with `status`, `url`, and body text.
Zod schema mismatches throw `ZodError`.

```ts
import { ApiError } from "axcelerate-client";

try {
	await ax.course.getDetial({ id: 1, type: "p" });
} catch (e) {
	if (e instanceof ApiError) {
		console.error(e.status, e.message);
	}
}
```

## Build

`tsup` builds ESM and CJS with types.

```bash
npm run build
```

## Notes

- Dates are strings as returned by the API. Validation tolerates `YYYY-MM-DD hh:mm` where applicable.

## Contributing

- Keep endpoints small and validated.
- Add fixtures for tests. Prefer Undici `MockAgent`.

## License

MIT.
