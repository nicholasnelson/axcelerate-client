import { z } from "zod";
import { ContactResponseSchema } from "./base.schema";

export const GetContactPathParams = z.object({
	contactId: z.number().int().positive(),
});

export const GetContactResponse = ContactResponseSchema;

export type GetContactParams = z.input<typeof GetContactPathParams>;
export type GetContactResponse = z.output<typeof ContactResponseSchema>;
