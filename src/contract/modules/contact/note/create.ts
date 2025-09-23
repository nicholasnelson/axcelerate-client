import { CreateContactNote } from "@schemas/contact/note/create";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const create = initContract().mutation({
	method: "POST",
	path: "/contact/note",
	contentType: "application/x-www-form-urlencoded",
	body: CreateContactNote.body,
	responses: {
		...CreateContactNote.responses,
	},
	summary: "Create a note on a contact",
});

export type CreateContactNoteRequest = ClientInferRequest<typeof create>;
export type CreateContactNoteResponses = ClientInferResponses<typeof create>;
export type CreateContactNoteResponseBody = ClientInferResponseBody<
	typeof create
>;
