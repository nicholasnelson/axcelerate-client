import { SearchOrganisations } from "@schemas/organisation/search";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const search = initContract().query({
	method: "GET",
	path: "/organisations/",
	query: SearchOrganisations.query,
	responses: {
		...SearchOrganisations.responses,
	},
	summary: "Search organisations",
});

export type SearchOrganisationsRequest = ClientInferRequest<typeof search>;
export type SearchOrganisationsResponses = ClientInferResponses<typeof search>;
export type SearchOrganisationsResponseBody = ClientInferResponseBody<
	typeof search
>;
