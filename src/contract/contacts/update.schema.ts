import { BaseContactBody } from "./base.schema";
import { CreateContactResponse } from "./create.schema";

export const UpdateContactBody = BaseContactBody.omit({
	checkEmailAddressUnique: true,
}) // not valid on PUT per API doc
	.partial();

export const UpdateContactResponse = CreateContactResponse;
