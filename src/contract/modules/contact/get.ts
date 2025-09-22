import { GetContact } from "@schemas/contact/get";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const get = initContract().query({
	method: "GET",
	path: "/contact/:contactId",
	pathParams: GetContact.pathParams,
	query: GetContact.query,
	responses: {
		...GetContact.responses,
	},
	summary: "Get a contact",
});

export type GetContactRequest = ClientInferRequest<typeof get>;
export type GetContactResponses = ClientInferResponses<typeof get>;
export type GetContactResponseBody = ClientInferResponseBody<typeof get>;
