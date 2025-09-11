import { HttpClient } from "./net/HttpClient";
import { mountEndpoints } from "./resources/_registry";
import "./resources/_all";
import "./types/endpoints.d.ts";

export interface ClientOptions {
	apiToken: string;
	wsToken: string;
	baseUrl: string;
	fetchImpl?: typeof fetch;
}

export class AxcelerateClient {
	readonly httpClient: HttpClient;

	constructor(opts: ClientOptions) {
		if (!opts.apiToken || !opts.wsToken)
			throw new Error("apiToken and wsToken are required");
		this.httpClient = new HttpClient({
			baseUrl: opts.baseUrl,
			headers: { apitoken: opts.apiToken, wstoken: opts.wsToken },
			fetchImpl: opts.fetchImpl,
		});
		mountEndpoints(this);
	}
}
