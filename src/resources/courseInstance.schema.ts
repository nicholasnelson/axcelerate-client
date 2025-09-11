import { z } from "zod";
import { AxcelerateDate, Id } from "./types";
import { ActivityType } from "./types";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export const CourseInstancesQuery = z.object({
	ID: Id,
	type: ActivityType,
	public: z.boolean().optional(),
	current: z.boolean().optional(),
	isActive: z.boolean().optional(),
	lastUpdated_min: AxcelerateDate.optional(),
	lastUpdated_max: AxcelerateDate.optional(),
});

export const CourseInstanceObject = z.object({
	ID: Id,
	INSTANCEID: z.number().int().positive(),
	NAME: z.string(),
	STARTDATE: AxcelerateDate,
	FINISHDATE: AxcelerateDate.optional(),
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
	LASTUPDATEDUTC: AxcelerateDate,
	ISACTIVE: z.boolean(),
	STATUS: z.string().nullable().optional(),
});

export const CourseInstanceList = z.array(CourseInstanceObject);
