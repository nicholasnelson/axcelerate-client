import type { QueryEndpointSchemas } from "@schemas/meta";
import { z } from "zod";

import { Pagination } from "@schemas/fields";
import { ContactResponseSchema } from "./base";

const SearchContactsQuerySchema = z
	.object({
		// q: z.string().optional(), // This is just an alias for search so leave it out
		search: z.string().optional(),
		contactEntryDate: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/)
			.optional(),
		lastUpdated: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/)
			.optional(),
		givenName: z.string().optional(),
		surname: z.string().optional(),
		emailAddress: z.string().email().optional(),
		contactRoleID: z.number().int().optional(),
		contactIDs: z.string().optional(), // comma-delimited numeric list
		contactID: z.number().int().optional(),
		optionalID: z.string().optional(),
		DOB: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/)
			.optional(),
	})
	.extend(Pagination.shape);

export const SearchContactsResponse = z.array(ContactResponseSchema);

export const SearchContacts = {
	query: SearchContactsQuerySchema,
	responses: {
		200: SearchContactsResponse,
	},
} satisfies QueryEndpointSchemas;

export const SearchContactsQuery = SearchContacts.query;
