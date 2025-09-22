import type { MutationEndpointSchemas } from "@schemas/meta";

import { BaseContactBody, ContactIdPathParam } from "./base";
import { CreateContactResponse } from "./create";

export const UpdateContactBody = BaseContactBody.omit({
	checkEmailAddressUnique: true,
}) // not valid on PUT per API doc
	.partial();

export const UpdateContactResponse = CreateContactResponse;

export const UpdateContact = {
	pathParams: ContactIdPathParam,
	body: UpdateContactBody,
	responses: {
		200: UpdateContactResponse,
	},
} satisfies MutationEndpointSchemas;
