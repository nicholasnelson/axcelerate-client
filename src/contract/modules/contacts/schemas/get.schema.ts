import z from "zod";

import { ContactIdPathParam, ContactResponseSchema } from "./base.schema";

export const GetContactPathParams = ContactIdPathParam;

export const GetContactQuery = z.object({});

export const GetContactResponse = ContactResponseSchema;
export type Contact = z.infer<typeof GetContactResponse>;
