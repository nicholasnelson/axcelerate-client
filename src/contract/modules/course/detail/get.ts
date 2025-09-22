import { GetCourseDetail } from "@schemas/course/detail";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const get = initContract().query({
	method: "GET",
	path: "/course/detail",
	query: GetCourseDetail.query,
	responses: {
		...GetCourseDetail.responses,
	},
	summary: "Get course detail",
});

export type GetCourseDetailRequest = ClientInferRequest<typeof get>;
export type GetCourseDetailResponses = ClientInferResponses<typeof get>;
export type GetCourseDetailResponseBody = ClientInferResponseBody<typeof get>;
