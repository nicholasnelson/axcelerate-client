import { CreateEnrolMultiple } from "@schemas/course/enrolment";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const enrolMultiple = initContract().mutation({
	method: "POST",
	path: "/course/enrolMultiple",
	contentType: "application/x-www-form-urlencoded",
	body: CreateEnrolMultiple.body,
	responses: {
		...CreateEnrolMultiple.responses,
	},
	summary: "Enrol multiple contacts",
});

export type CreateEnrolMultipleRequest = ClientInferRequest<
	typeof enrolMultiple
>;
export type CreateEnrolMultipleResponses = ClientInferResponses<
	typeof enrolMultiple
>;
export type CreateEnrolMultipleResponseBody = ClientInferResponseBody<
	typeof enrolMultiple
>;
