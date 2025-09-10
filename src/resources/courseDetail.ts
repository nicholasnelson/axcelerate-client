import { AxcelerateEndpoint } from "./endpoint";
import {
	CourseDetail as CourseDetailSchema,
	CourseDetailQuery,
} from "./courseDetail.schemas";

export class CourseDetail extends AxcelerateEndpoint {
	async get(q: CourseDetailQuery) {
		const { id, type } = CourseDetailQuery.parse(q);
		const data = await this.http.get("course/detail", { ID: id, type });
		return CourseDetailSchema.parse(data);
	}
}
