import { z } from "zod";
import { CreateContactQuery } from "./create.schema";
import { GetContactResponse } from "./get.schema";

export const ContactPathParams = z.object({
	contactID: z.number().int().positive(),
});

export const UpdateContactBody = CreateContactQuery.omit({
	checkEmailAddressUnique: true,
}) // not valid on PUT per API doc
	.partial();

export const UpdateContactResponse = GetContactResponse;
