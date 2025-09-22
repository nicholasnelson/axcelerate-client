import type { MutationEndpointSchemas } from "@schemas/meta";

import { BaseContactBody, ContactIdPathParam } from "./base";
import { CreateContactResponse } from "./create";

const UpdateContactBody = BaseContactBody.omit({
	checkEmailAddressUnique: true,
}) // not valid on PUT per API doc
	.partial();

const UpdateContactResponse = CreateContactResponse;

export const UpdateContact = {
	pathParams: ContactIdPathParam,
	body: UpdateContactBody,
	responses: {
		200: UpdateContactResponse,
	},
} satisfies MutationEndpointSchemas;
