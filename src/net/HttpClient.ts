import z, { ZodType } from "zod";
import { ApiError } from "../errors";
import { RequestData, ResponseHeaders } from "../types";
import { parseHeadersForFetch } from "../utils";

export interface HttpInit {
	baseUrl: string;
	headers: Record<string, string>;
	fetchImpl?: typeof fetch;
}

export class HttpClient {
	private base: string;
	private baseHeaders: Record<string, string>;
	private fetchImpl: typeof fetch;

	constructor(init: HttpInit) {
		this.base = init.baseUrl.endsWith("/") ? init.baseUrl : init.baseUrl + "/";
		this.baseHeaders = init.headers;
		this.fetchImpl = init.fetchImpl ?? fetch;
	}

	private toSearchParams(data?: RequestData): URLSearchParams | undefined {
		if (!data) return undefined;
		const usp = new URLSearchParams();
		for (const [k, v] of Object.entries(data)) {
			if (v === undefined || v === null) continue;
			if (Array.isArray(v)) {
				for (const item of v) usp.append(k, String(item));
			} else {
				usp.append(k, String(v));
			}
		}
		return usp;
	}

	private url(path: string, q?: RequestData) {
		const u = new URL(this.base);

		// join base pathname + relative path safely
		const basePath = u.pathname.replace(/\/+$/, ""); // '/api/' -> '/api'
		const relPath = path.replace(/^\/+/, ""); // '/v1'   -> 'v1'
		u.pathname = relPath ? `${basePath}/${relPath}` : basePath || "/";

		if (q)
			for (const [k, v] of Object.entries(q))
				if (v != null) u.searchParams.append(k, String(v));

		return u;
	}

	async makeRequest({
		path,
		method,
		request,
	}: {
		path: string;
		method: string;
		request: RequestData;
	}): Promise<HttpClientResponse> {
		const methodHasPayload = /^(POST|PUT|PATCH)$/i.test(method);
		const url = this.url(path, methodHasPayload ? undefined : request);

		console.log(url);

		// start from a plain object
		const headersObj: Record<string, string> = { ...this.baseHeaders };

		let body: URLSearchParams | undefined;
		if (methodHasPayload) {
			body = this.toSearchParams(request);
			// set content-type only if sending a body and not already provided
			if (
				body &&
				!Object.keys(headersObj).some((k) => k.toLowerCase() === "content-type")
			) {
				headersObj["content-type"] = "application/x-www-form-urlencoded";
			}
		}

		const res = await this.fetchImpl(url.toString(), {
			method,
			headers: parseHeadersForFetch(headersObj),
			body,
		});

		if (!res.ok)
			throw new ApiError(res.status, url.toString(), await res.text());
		return new HttpClientResponse(res);
	}
}

export class HttpClientResponse {
	private res: Response;
	private statusCode: number;
	private headers: ResponseHeaders;
	private consumed = false;

	constructor(res: Response) {
		this.statusCode = res.status;
		this.headers = HttpClientResponse.transformHeadersToObject(res.headers);
		this.res = res;
	}

	getStatusCode(): number {
		return this.statusCode;
	}
	getHeaders(): ResponseHeaders {
		return this.headers;
	}
	getRawResponse(): Response {
		return this.res;
	}

	private assertNotConsumed() {
		if (this.consumed) throw new Error("Response body already consumed");
		this.consumed = true;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async toJSON(): Promise<any> {
		this.assertNotConsumed();
		return this.res.json();
	}

	async parseWith<T extends ZodType>(schema: T): Promise<z.output<T>> {
		this.assertNotConsumed();
		const data = await this.res.json();
		return schema.parse(data);
	}

	private static transformHeadersToObject(headers: Headers): ResponseHeaders {
		return Array.from(headers).reduce((acc, [name, value]) => {
			acc[name] = value;
			return acc;
		}, {} as ResponseHeaders);
	}
}
