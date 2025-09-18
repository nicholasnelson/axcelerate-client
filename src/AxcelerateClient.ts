import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { createKyClient } from "./kyClient";

interface ClientOptions {
	apiToken: string;
	wsToken: string;
	baseUrl: string;
}

export const createAxcelerateClient = ({
	baseUrl,
	apiToken,
	wsToken,
}: ClientOptions) =>
	initClient(contract, {
		fetchClient: createKyClient(),
		baseUrl,
		baseHeaders: {
			apiToken,
			wsToken,
		},
		validateResponse: true,
		throwOnUnknownStatus: true,
	});
