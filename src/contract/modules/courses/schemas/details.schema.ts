import { z } from "zod";

import {
	Id,
	ActivityType,
	AxcelerateDateTime,
	GSTType,
	CourseTypeFilter,
} from "../../../../schemas";

// ---------- Query (GET /course/detail) ----------
export const GetCourseDetailQuery = z.object({
	ID: Id, // required
	type: CourseTypeFilter, // required: "w" | "p" | "el"
});

// ---------- Response ----------
const RawCourseDetailBase = z.object({
	OUTLINE: z.string(),
	CODE: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	NAME: z.string(),
	ID: Id,
	TYPE: ActivityType, // constrained by variants below
	DESCRIPTION: z.string().nullable(),
	LASTUPDATEDUTC: AxcelerateDateTime.optional(),
});

// Program/Qualification (TYPE = "p")
const RawCourseDetailProgram = RawCourseDetailBase.extend({
	TYPE: z.literal("p"),
}).transform((r) => ({
	outline: r.OUTLINE,
	code: r.CODE,
	cost: r.COST,
	gstType: r.GST_TYPE,
	name: r.NAME,
	id: r.ID,
	type: r.TYPE,
	description: r.DESCRIPTION,
	lastUpdatedUtc: r.LASTUPDATEDUTC,
}));

// Workshop (TYPE = "w")
const RawCourseDetailWorkshop = RawCourseDetailBase.extend({
	TYPE: z.literal("w"),
	DURATION: z.string(), // e.g. "4 hours"
	OUTLINEELEMENTS: z.object({
		CONTENT: z.array(z.string()),
		SHORTDESCRIPTION: z.string(),
		INTRODUCTION: z.string(),
		IMAGES: z.array(z.unknown()),
		TARGETAUDIENCE: z.string(),
		ADDITIONALINFORMATION: z.string(),
		LEARNINGMETHODS: z.string(),
		LEARNINGOUTCOMES: z.array(z.string()),
		PROGRAMBENEFITS: z.array(z.string()),
	}),
}).transform((r) => ({
	outline: r.OUTLINE,
	code: r.CODE,
	cost: r.COST,
	gstType: r.GST_TYPE,
	name: r.NAME,
	id: r.ID,
	type: r.TYPE,
	description: r.DESCRIPTION,
	lastUpdatedUtc: r.LASTUPDATEDUTC,

	duration: r.DURATION,
	outlineElements: {
		content: r.OUTLINEELEMENTS.CONTENT,
		shortDescription: r.OUTLINEELEMENTS.SHORTDESCRIPTION,
		introduction: r.OUTLINEELEMENTS.INTRODUCTION,
		images: r.OUTLINEELEMENTS.IMAGES,
		targetAudience: r.OUTLINEELEMENTS.TARGETAUDIENCE,
		additionalInformation: r.OUTLINEELEMENTS.ADDITIONALINFORMATION,
		learningMethods: r.OUTLINEELEMENTS.LEARNINGMETHODS,
		learningOutcomes: r.OUTLINEELEMENTS.LEARNINGOUTCOMES,
		programBenefits: r.OUTLINEELEMENTS.PROGRAMBENEFITS,
	},
}));

/**
 * NOTE: Docs say type may be "el" (e-learning) but no sample is provided.
 * Add a third variant when an example is available.
 */

// Discriminated union by TYPE
export const GetCourseDetailResponse = z.discriminatedUnion("TYPE", [
	RawCourseDetailProgram,
	RawCourseDetailWorkshop,
]);
