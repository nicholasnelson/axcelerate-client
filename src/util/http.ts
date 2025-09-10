import { ApiError } from "../errors";

export interface HttpInit {
	baseUrl: string;
	headers: Record<string, string>;
	fetchImpl?: typeof fetch;
}

export type HttpQuery = Record<string, string | number | boolean | undefined>;

export class Http {
	private base: string;
	private headers: Record<string, string>;
	private fetchImpl: typeof fetch;

	constructor(init: HttpInit) {
		this.base = init.baseUrl.endsWith("/") ? init.baseUrl : init.baseUrl + "/";
		this.headers = init.headers;
		this.fetchImpl = init.fetchImpl ?? fetch;
	}

	private url(path: string, q?: HttpQuery) {
		const u = new URL(path, this.base);
		if (q)
			for (const [k, v] of Object.entries(q))
				if (v !== undefined) u.searchParams.append(k, String(v));
		return u.toString();
	}

	async get<T>(path: string, q?: HttpQuery): Promise<T> {
		const url = this.url(path, q);
		const res = await this.fetchImpl(url, {
			method: "GET",
			headers: this.headers,
		});
		if (!res.ok) throw new ApiError(res.status, url, await res.text());
		return res.json() as Promise<T>;
	}

	async post<T>(path: string, body?: unknown): Promise<T> {
		const url = this.url(path);
		const res = await this.fetchImpl(url, {
			method: "POST",
			headers: { ...this.headers, "content-type": "application/json" },
			body: body == null ? undefined : JSON.stringify(body),
		});
		if (!res.ok) throw new ApiError(res.status, url, await res.text());
		return res.json() as Promise<T>;
	}

	async postForm<T>(
		path: string,
		form: URLSearchParams | Record<string, string>,
	): Promise<T> {
		const url = this.url(path);
		const body =
			form instanceof URLSearchParams
				? form
				: new URLSearchParams(form as Record<string, string>);
		const res = await this.fetchImpl(url, {
			method: "POST",
			headers: {
				...this.headers,
				"content-type": "application/x-www-form-urlencoded",
			},
			body,
		});
		if (!res.ok) throw new ApiError(res.status, url, await res.text());
		return res.json() as Promise<T>;
	}
}
