import { AxcelerateClient } from "./AxcelerateClient";
import { MethodSpec, RequestData } from "./types";
import { HttpClientResponse } from "./net/HttpClient";

export abstract class AxcelerateResource {
	protected readonly axcelerate: AxcelerateClient;
	protected readonly path: string = "/";

	constructor(axcelerate: AxcelerateClient) {
		this.axcelerate = axcelerate;
	}

	protected makeRequest(
		request: RequestData,
		spec: MethodSpec,
	): Promise<HttpClientResponse> {
		return this.axcelerate.httpClient.makeRequest({
			method: spec.method,
			path: spec.path,
			request,
		});
	}
}
