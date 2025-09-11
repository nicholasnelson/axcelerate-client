import { AxcelerateResource } from "../AxcelerateResource";
import { endpoint } from "./_registry";
import { axcelerateMethod } from "../AxcelerateMethod";
import { EnrolRequest, EnrolResponse } from "./courseEnrol.schema";

@endpoint("course/enrolment")
export class CourseEnrol extends AxcelerateResource {
	create = axcelerateMethod(EnrolRequest, EnrolResponse, {
		method: "POST",
		path: "/course/enrol",
	});
}
