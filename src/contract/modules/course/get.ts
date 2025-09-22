import { GetCourses } from "@schemas/course/course";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const get = initContract().query({
	method: "GET",
	path: "/courses",
	query: GetCourses.query,
	responses: {
		...GetCourses.responses,
	},
	summary: "Get courses",
});

export type GetCoursesRequest = ClientInferRequest<typeof get>;
export type GetCoursesResponses = ClientInferResponses<typeof get>;
export type GetCoursesResponseBody = ClientInferResponseBody<typeof get>;
