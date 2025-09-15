import { AxcelerateResource } from "../../../AxcelerateResource";
import { endpoint } from "../../_registry";
import { axcelerateMethod } from "../../../AxcelerateMethod";
import {
	GetCourseInstancesQuery,
	GetCourseInstancesResponse,
} from "./courseInstance.schema";

@endpoint("course/instance")
export class CourseInstance extends AxcelerateResource {
	list = axcelerateMethod(GetCourseInstancesQuery, GetCourseInstancesResponse, {
		method: "GET",
		path: "/course/instances",
	});
}
