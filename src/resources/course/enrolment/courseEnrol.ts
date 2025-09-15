import { AxcelerateResource } from "../../../AxcelerateResource";
import { endpoint } from "../../_registry";
import { axcelerateMethod } from "../../../AxcelerateMethod";
import { CreateEnrolmentQuery, CreateEnrolmentResponse } from "./create.schema";

@endpoint("course/enrolment")
export class CourseEnrol extends AxcelerateResource {
	create = axcelerateMethod(CreateEnrolmentQuery, CreateEnrolmentResponse, {
		method: "POST",
		path: "/course/enrol",
	});
}
