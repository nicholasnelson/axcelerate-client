import type { QueryEndpointSchemas } from "@schemas/meta";
import { z } from "zod";

import {
	AxcelerateDateTime,
	GSTType,
	Pagination,
	Sorting,
} from "@schemas/fields";

export const ActivityType = z.union([
	z.literal("w"),
	z.literal("p"),
	z.literal("el"),
]);

export const CourseTypeFilter = z.enum(["w", "p", "el", "all"]);

// ---------- Query (GET /courses) ----------
export const GetCoursesQuery = z
	.object({
		ID: z.number().int().optional(),
		searchTerm: z.string().optional(),
		type: CourseTypeFilter.optional(), // "w" | "p" | "el" | "all"
		trainingArea: z.string().optional(),
		current: z.boolean().optional(),
		public: z.boolean().optional(),
		lastUpdated_min: AxcelerateDateTime.optional(),
		lastUpdated_max: AxcelerateDateTime.optional(),
		isActive: z.boolean().optional(),
	})
	.extend(Pagination.shape)
	.extend(Sorting.shape);

// ---------- Response ----------
/** Raw course shape seen in list GET. */
const RawCourse = z.object({
	ROWID: z.number().int().positive(),
	ID: z.number().int().positive(),
	COUNT: z.number().int().nonnegative(),
	NAME: z.string(),
	STREAMNAME: z.string().nullable(),
	CODE: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	DELIVERY: z.string(),
	DURATION: z.number().int().nonnegative(),
	DURATIONTYPE: z.string().nullable(),
	ISACTIVE: z.boolean().optional(), // absent in some rows
	TYPE: ActivityType, // e.g. "w" | "p" | "el"
	SHORTDESCRIPTION: z.string().nullable(),
	PRIMARYIMAGE: z.string().nullable(),
	SECONDARYIMAGE: z.string().nullable(),
	LASTUPDATEDUTC: AxcelerateDateTime, // "YYYY-MM-DD hh:mm"
});

const Course = RawCourse.transform((r) => ({
	rowId: r.ROWID,
	id: r.ID,
	count: r.COUNT,
	name: r.NAME,
	streamName: r.STREAMNAME,
	code: r.CODE,
	cost: r.COST,
	gstType: r.GST_TYPE,
	delivery: r.DELIVERY,
	duration: r.DURATION,
	durationType: r.DURATIONTYPE,
	...(r.ISACTIVE !== undefined ? { isActive: r.ISACTIVE } : {}),
	type: r.TYPE,
	shortDescription: r.SHORTDESCRIPTION,
	primaryImage: r.PRIMARYIMAGE,
	secondaryImage: r.SECONDARYIMAGE,
	lastUpdatedUtc: r.LASTUPDATEDUTC,
}));

export const GetCoursesResponse = z.array(Course);

export const GetCourses = {
	query: GetCoursesQuery,
	responses: {
		200: GetCoursesResponse,
	},
} satisfies QueryEndpointSchemas;
