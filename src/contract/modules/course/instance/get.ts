import { GetCourseInstances } from "@schemas/course/instance";
import {
	initContract,
	type ClientInferRequest,
	type ClientInferResponseBody,
	type ClientInferResponses,
} from "@ts-rest/core";

export const get = initContract().query({
	method: "GET",
	path: "/course/instances",
	query: GetCourseInstances.query,
	responses: {
		...GetCourseInstances.responses,
	},
	summary: "Get course instances",
});

export type GetCourseInstancesRequest = ClientInferRequest<typeof get>;
export type GetCourseInstancesResponses = ClientInferResponses<typeof get>;
export type GetCourseInstancesResponseBody = ClientInferResponseBody<
	typeof get
>;
