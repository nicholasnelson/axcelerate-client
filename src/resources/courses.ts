import { z } from "zod";
import type { ListCoursesQuery } from "./courses.schemas";
import { CourseListItem, ListCoursesQuery as ListQ } from "./courses.schemas";
import { AxcelerateEndpoint } from "./endpoint";

export class Courses extends AxcelerateEndpoint {
	async list(q?: ListCoursesQuery) {
		const query = q ? ListQ.parse(q) : undefined;
		const data = await this.http.get("courses", query);
		return z.array(CourseListItem).parse(data);
	}

	async get(id: number) {
		const data = await this.http.get(`courses/${id}`);
		return CourseListItem.parse(data);
	}
}
