import { z } from "zod";
import { AxcelerateDate, Id } from "../util/schemas";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);
export const ActivityType = z.union([
	z.literal("w"),
	z.literal("p"),
	z.literal("el"),
]);
export type ActivityType = z.infer<typeof ActivityType>;

const Base = z.object({
	OUTLINE: z.string(),
	CODE: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	NAME: z.string(),
	ID: Id,
	DESCRIPTION: z.string().nullable(),
	LASTUPDATEDUTC: z.string().regex(AxcelerateDate).optional(),
});

const OutlineElements = z.object({
	CONTENT: z.array(z.string()).optional(),
	SHORTDESCRIPTION: z.string().optional(),
	INTRODUCTION: z.string().optional(),
	IMAGES: z.array(z.unknown()).optional(),
	TARGETAUDIENCE: z.string().optional(),
	ADDITIONALINFORMATION: z.string().optional(),
	LEARNINGMETHODS: z.string().optional(),
	LEARNINGOUTCOMES: z.array(z.string()).optional(),
	PROGRAMBENEFITS: z.array(z.string()).optional(),
});

export const CourseDetailWorkshop = Base.extend({
	TYPE: z.literal("w"),
	DURATION: z.string().optional(),
	OUTLINEELEMENTS: OutlineElements,
});
export const CourseDetailProgram = Base.extend({ TYPE: z.literal("p") });
export const CourseDetailELearning = Base.extend({ TYPE: z.literal("el") });

export const CourseDetail = z.discriminatedUnion("TYPE", [
	CourseDetailWorkshop,
	CourseDetailProgram,
	CourseDetailELearning,
]);
export type CourseDetail = z.infer<typeof CourseDetail>;

export const CourseDetailQuery = z.object({
	id: Id,
	type: ActivityType,
});
export type CourseDetailQuery = z.infer<typeof CourseDetailQuery>;
