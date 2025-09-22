import { CreateEnrol } from "@schemas/course/enrolment";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const enrol = initContract().mutation({
	method: "POST",
	path: "/course/enrol",
	contentType: "application/x-www-form-urlencoded",
	body: CreateEnrol.body,
	responses: {
		...CreateEnrol.responses,
	},
	summary: "Enrol a contact",
});

export type CreateEnrolRequest = ClientInferRequest<typeof enrol>;
export type CreateEnrolResponses = ClientInferResponses<typeof enrol>;
export type CreateEnrolResponseBody = ClientInferResponseBody<typeof enrol>;
