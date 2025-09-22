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
