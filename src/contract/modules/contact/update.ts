import { UpdateContact } from "@schemas/contact/update";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const update = initContract().mutation({
	method: "PUT",
	path: "/contact/:contactId",
	pathParams: UpdateContact.pathParams,
	body: UpdateContact.body,
	responses: {
		...UpdateContact.responses,
	},
	summary: "Update a contact",
});

export type UpdateContactRequest = ClientInferRequest<typeof update>;
export type UpdateContactResponses = ClientInferResponses<typeof update>;
export type UpdateContactResponseBody = ClientInferResponseBody<typeof update>;
