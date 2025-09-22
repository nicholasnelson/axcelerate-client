import { CreateContact } from "@schemas/contact/create";
import { initContract } from "@ts-rest/core";

export const create = initContract().mutation({
	method: "POST",
	path: "/contact/",
	body: CreateContact.body,
	responses: {
		...CreateContact.responses,
	},
	summary: "Create a contact",
});
