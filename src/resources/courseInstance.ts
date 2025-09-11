import { AxcelerateResource } from "../AxcelerateResource";
import { endpoint } from "./_registry";
import { axcelerateMethod } from "../AxcelerateMethod";
import {
	CourseInstanceList,
	CourseInstancesQuery,
} from "./courseInstance.schema";

@endpoint("course/instance")
export class CourseInstance extends AxcelerateResource {
	list = axcelerateMethod(CourseInstancesQuery, CourseInstanceList, {
		method: "GET",
		path: "/course/instances",
	});
}
