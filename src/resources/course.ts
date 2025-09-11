import { AxcelerateResource } from "../AxcelerateResource";
import { endpoint } from "./_registry";
import { axcelerateMethod } from "../AxcelerateMethod";
import { CourseList, ListCoursesQuery } from "./course.schema";

@endpoint("course")
export class Course extends AxcelerateResource {
	list = axcelerateMethod(ListCoursesQuery, CourseList, {
		method: "GET",
		path: "/courses",
	});
}
