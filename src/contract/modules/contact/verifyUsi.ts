import { VerifyUSI } from "@schemas/contact/verifyUsi";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const verifyUsi = initContract().mutation({
	method: "POST",
	path: "/contact/verifyUSI",
	contentType: "application/x-www-form-urlencoded",
	body: VerifyUSI.body,
	responses: {
		...VerifyUSI.responses,
	},
	summary: "Verify the USI of a contact",
});

export type VerifyUsiRequest = ClientInferRequest<typeof verifyUsi>;
export type VerifyUsiResponses = ClientInferResponses<typeof verifyUsi>;
export type VerifyUsiResponseBody = ClientInferResponseBody<typeof verifyUsi>;
