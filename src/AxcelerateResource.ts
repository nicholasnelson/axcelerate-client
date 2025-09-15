import { AxcelerateClient } from "./AxcelerateClient";
import { MethodSpec, RequestData } from "./types";

export abstract class AxcelerateResource {
	protected readonly axcelerate: AxcelerateClient;

	constructor(axcelerate: AxcelerateClient) {
		this.axcelerate = axcelerate;
	}

	protected makeRequest(
		request: RequestData,
		spec: MethodSpec,
	): Promise<Response> {
		return this.axcelerate.httpClient.makeRequest({
			method: spec.method,
			path: spec.path,
			request,
		});
	}
}
