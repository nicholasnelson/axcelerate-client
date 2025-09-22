import { SearchContacts } from "@schemas/contact/search";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const search = initContract().query({
	method: "GET",
	path: "/contacts/search",
	query: SearchContacts.query,
	responses: {
		...SearchContacts.responses,
	},
	summary: "Search contacts",
});

export type SearchContactsRequest = ClientInferRequest<typeof search>;
export type SearchContactsResponses = ClientInferResponses<typeof search>;
export type SearchContactsResponseBody = ClientInferResponseBody<typeof search>;
