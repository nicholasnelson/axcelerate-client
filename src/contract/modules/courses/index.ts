import { initContract } from "@ts-rest/core";

import { GetCoursesQuery, GetCoursesResponse } from "./schemas/courses.schema";
import {
	GetCourseDetailQuery,
	GetCourseDetailResponse,
} from "./schemas/details.schema";
import {
	GetCourseInstancesQuery,
	GetCourseInstancesResponse,
} from "./schemas/courseInstance.schema";
import {
	CreateEnrolmentResponse,
	CreateEnrolMultipleBody,
	CreateEnrolMultipleResponse,
	CreateEnrolBody,
} from "./schemas/enrolment.schema";

export type { Course } from "./schemas/courses.schema";
export type { CourseInstance } from "./schemas/courseInstance.schema";
export type { CourseDetail } from "./schemas/details.schema";

export const courses = initContract().router({
	getCourses: {
		method: "GET",
		path: "/courses",
		query: GetCoursesQuery,
		responses: {
			200: GetCoursesResponse,
		},
		summary: "Get courses",
	},
	getCourseDetail: {
		method: "GET",
		path: "/course/detail",
		query: GetCourseDetailQuery,
		responses: {
			200: GetCourseDetailResponse,
		},
		summary: "Get course detail",
	},
	getCourseInstances: {
		method: "GET",
		path: "/course/instances",
		query: GetCourseInstancesQuery,
		responses: {
			200: GetCourseInstancesResponse,
			204: GetCourseInstancesResponse.length(0),
		},
		summary: "Get course instances",
	},
	enrol: {
		method: "POST",
		path: "/course/enrol",
		contentType: "application/x-www-form-urlencoded",
		body: CreateEnrolBody,
		responses: {
			200: CreateEnrolmentResponse,
		},
		summary: "Enrol a contact",
	},
	enrolMultiple: {
		method: "POST",
		path: "/course/enrolMultiple",
		contentType: "application/x-www-form-urlencoded",
		body: CreateEnrolMultipleBody,
		responses: {
			200: CreateEnrolMultipleResponse,
		},
		summary: "Enrol multiple contacts",
	},
});
