import { AxcelerateResource } from "../../AxcelerateResource";
import { endpoint } from "../_registry";
import { axcelerateMethod } from "../../AxcelerateMethod";
import { GetCoursesQuery, GetCoursesResponse } from "./list.schema";
import {
	GetCourseDetailQuery,
	GetCourseDetailResponse,
} from "./details.schema";

@endpoint("course")
export class Course extends AxcelerateResource {
	list = axcelerateMethod(GetCoursesQuery, GetCoursesResponse, {
		method: "GET",
		path: "/courses",
	});

	getDetail = axcelerateMethod(GetCourseDetailQuery, GetCourseDetailResponse, {
		method: "GET",
		path: "/course/detail",
	});
}
