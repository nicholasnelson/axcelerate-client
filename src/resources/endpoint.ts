import type { Http } from "../util/http";

export abstract class AxcelerateEndpoint {
	protected readonly http: Http;
	constructor(http: Http) {
		this.http = http;
	}
}
