import { z } from "zod";
import { AxcelerateDate, Id, Pagination } from "../util/schemas";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export const CourseListItem = z.object({
	ROWID: z.number().int().positive(),
	ID: Id,
	COUNT: z.number().int().nonnegative(),
	NAME: z.string(),
	STREAMNAME: z.string().nullable(),
	CODE: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	DELIVERY: z.string(),
	DURATION: z.number().int().nonnegative(),
	DURATIONTYPE: z.string().nullable(),
	ISACTIVE: z.boolean().optional(),
	TYPE: z.string(), // e.g. "p", "w"
	SHORTDESCRIPTION: z.string().nullable(), // may contain HTML
	PRIMARYIMAGE: z.string().nullable(),
	SECONDARYIMAGE: z.string().nullable(),
	LASTUPDATEDUTC: z.string().regex(AxcelerateDate),
});

export type CourseListItem = z.infer<typeof CourseListItem>;

export const ListCoursesQuery = Pagination.extend({
	search: z.string().optional(),
	type: z.string().optional(),
});
export type ListCoursesQuery = z.infer<typeof ListCoursesQuery>;
