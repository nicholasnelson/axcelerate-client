import { z } from "zod";
import { AxcelerateEndpoint } from "./endpoint";
import {
	CourseInstancesQuery,
	CourseInstanceItem,
} from "./courseInstances.schemas";

export class CourseInstances extends AxcelerateEndpoint {
	async list(q: z.infer<typeof CourseInstancesQuery>) {
		const { id, type, ...rest } = CourseInstancesQuery.parse(q);
		const data = await this.http.get("course/instances", {
			ID: id,
			type,
			...rest,
		});
		return z.array(CourseInstanceItem).parse(data);
	}
}
