import type { QueryEndpointSchemas } from "@schemas/meta";
import z from "zod";

import { ContactIdPathParam, ContactResponseSchema } from "./base";

export const GetContact = {
	pathParams: ContactIdPathParam,
	query: z.object({}),
	responses: {
		200: ContactResponseSchema,
	},
} satisfies QueryEndpointSchemas;

export const GetContactPathParams = GetContact.pathParams;
export const GetContactQuery = GetContact.query;
export const GetContactResponse = GetContact.responses[200];
