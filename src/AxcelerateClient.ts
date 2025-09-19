import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { apiFetcher } from "./apiFetcher";

export interface AxcelerateClientOptions {
	apiToken: string;
	wsToken: string;
	baseUrl: string;
}

export const createAxcelerateClient = ({
	baseUrl,
	apiToken,
	wsToken,
}: AxcelerateClientOptions) =>
	initClient(contract, {
		api: apiFetcher,
		baseUrl,
		baseHeaders: {
			apiToken,
			wsToken,
		},
		validateResponse: true,
		throwOnUnknownStatus: true,
	});
