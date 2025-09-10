import { z } from "zod";
import { AxcelerateDate, Id } from "../util/schemas";
import { ActivityType } from "./courseDetail.schemas";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export const CourseInstancesQuery = z.object({
	id: Id,
	type: ActivityType,
	public: z.boolean().optional(),
	current: z.boolean().optional(),
	isActive: z.boolean().optional(),
	lastUpdated_min: z.string().regex(AxcelerateDate).optional(),
	lastUpdated_max: z.string().regex(AxcelerateDate).optional(),
});
export type CourseInstancesQuery = z.infer<typeof CourseInstancesQuery>;

export const CourseInstanceItem = z.object({
	ID: Id,
	INSTANCEID: z.number().int().positive(),
	NAME: z.string(),
	STARTDATE: z.string().regex(AxcelerateDate),
	FINISHDATE: z.string().regex(AxcelerateDate).optional(),
	DATEDESCRIPTOR: z.string().optional(),
	LOCATION: z.string().nullable().optional(),
	COST: z.number(),
	GST_TYPE: GSTType,
	OWNERCONTACTID: z.number().int().optional(),
	TRAINERCONTACTID: z.number().int().optional(),
	NOTICES: z.string().nullable().optional(),
	PARTICIPANTS: z.number().int().nonnegative().optional(),
	MAXPARTICIPANTS: z.number().int().nonnegative().optional(),
	MINPARTICIPANTS: z.number().int().nonnegative().optional(),
	PARTICIPANTVACANCY: z.number().int().optional(),
	ENROLMENTOPEN: z.boolean().optional(),
	LASTUPDATEDUTC: z.string().regex(AxcelerateDate),
	ISACTIVE: z.boolean(),
	STATUS: z.string().nullable().optional(),
});
export type CourseInstanceItem = z.infer<typeof CourseInstanceItem>;
