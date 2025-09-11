import { AxcelerateResource } from "../AxcelerateResource";
import { endpoint } from "./_registry";
import { axcelerateMethod } from "../AxcelerateMethod";
import { CourseDetailQuery, CourseDetailObject } from "./courseDetail.schema";

@endpoint("course/detail")
export class CourseDetail extends AxcelerateResource {
	get = axcelerateMethod(CourseDetailQuery, CourseDetailObject, {
		method: "GET",
		path: "/course/detail",
	});
}
