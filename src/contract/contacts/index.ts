import { initContract } from "@ts-rest/core";

import { ContactIdPathParam } from "./base.schema";
import { CreateContactBody, CreateContactResponse } from "./create.schema";
import {
	GetContactPathParams,
	GetContactQuery,
	GetContactResponse,
} from "./get.schema";
import {
	CreateContactNoteBody,
	CreateContactNoteResponse,
} from "./note.schema";
import { SearchContactsQuery, SearchContactsResponse } from "./search.schema";
import { UpdateContactBody, UpdateContactResponse } from "./update.schema";
import { VerifyUSIBody, VerifyUSIResponse } from "./verifyUsi.schema";

const c = initContract();

export const contacts = c.router({
	createContact: {
		method: "POST",
		path: "/contact/",
		body: CreateContactBody,
		responses: {
			200: CreateContactResponse,
		},
		summary: "Create a contact",
	},
	updateContact: {
		method: "PUT",
		path: "/contact/:contactId",
		pathParams: ContactIdPathParam,
		body: UpdateContactBody,
		responses: {
			200: UpdateContactResponse,
		},
		summary: "Update a contact",
	},
	getContact: {
		method: "GET",
		path: "/contact/:contactId",
		pathParams: GetContactPathParams,
		query: GetContactQuery,
		responses: {
			200: GetContactResponse,
		},
		summary: "Get a contact",
	},
	searchContacts: {
		method: "GET",
		path: "/contacts/search",
		query: SearchContactsQuery,
		responses: {
			200: SearchContactsResponse,
		},
		summary: "Search contacts",
	},
	verifyUSI: {
		method: "POST",
		path: "/contact/verifyUSI",
		body: VerifyUSIBody,
		responses: {
			200: VerifyUSIResponse,
		},
		summary: "Verify the USI of a contact",
	},
	createContactNote: {
		method: "POST",
		path: "/contact/note",
		body: CreateContactNoteBody,
		responses: {
			200: CreateContactNoteResponse,
		},
		summary: "Create a note on a contact",
	},
});
