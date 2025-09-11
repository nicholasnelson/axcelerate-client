import { z } from "zod";
import { AxcelerateDate, Id } from "./types";
import { ActivityType, GSTType } from "./types";

const Base = z.object({
	OUTLINE: z.string(),
	CODE: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	NAME: z.string(),
	ID: Id,
	DESCRIPTION: z.string().nullable(),
	LASTUPDATEDUTC: AxcelerateDate.optional(),
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

export const CourseDetailObject = z.discriminatedUnion("TYPE", [
	CourseDetailWorkshop,
	CourseDetailProgram,
	CourseDetailELearning,
]);

export const CourseDetailQuery = z.object({
	ID: Id,
	type: ActivityType,
});
