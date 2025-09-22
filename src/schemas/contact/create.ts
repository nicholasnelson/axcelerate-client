import type { MutationEndpointSchemas } from "@schemas/meta";
import { z } from "zod";

import { BaseContactBody } from "./base";

const RawCreateContactResponse = z.object({
	EMAILADDRESS: z.string(),
	GIVENNAME: z.string(),
	SURNAME: z.string(),
	CONTACTID: z.number().int().positive(),
});

export const CreateContactResponse = RawCreateContactResponse.transform(
	(r) => ({
		emailAddress: r.EMAILADDRESS,
		givenName: r.GIVENNAME,
		surname: r.SURNAME,
		contactId: r.CONTACTID,
	}),
);

export const CreateContact = {
	body: BaseContactBody,
	responses: {
		200: CreateContactResponse,
	},
} satisfies MutationEndpointSchemas;
