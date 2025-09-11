import { z } from "zod";
import { ActivityType, AxcelerateDate, Id, Pagination } from "./types";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export const CourseObject = z.object({
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
	TYPE: ActivityType,
	SHORTDESCRIPTION: z.string().nullable(), // may contain HTML
	PRIMARYIMAGE: z.string().nullable(),
	SECONDARYIMAGE: z.string().nullable(),
	LASTUPDATEDUTC: AxcelerateDate,
});

export const ListCoursesQuery = Pagination.extend({
	search: z.string().optional(),
	type: ActivityType.optional(),
});

export const CourseList = z.array(CourseObject);
