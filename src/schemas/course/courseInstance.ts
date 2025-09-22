import type { QueryEndpointSchemas } from "@schemas/meta";
import { z } from "zod";

import { AxcelerateDateTime, GSTType, Id } from "@schemas/fields";
import { CourseTypeFilter } from "./course";

/** GET /course/instances — Query */
export const GetCourseInstancesQuery = z.object({
	ID: Id, // required
	type: CourseTypeFilter, // required: "w" | "p" | "el"
	public: z.boolean().optional(),
	current: z.boolean().optional(),
	isActive: z.boolean().optional(),
	lastUpdated_min: AxcelerateDateTime.optional(), // "YYYY-MM-DD hh:mm"
	lastUpdated_max: AxcelerateDateTime.optional(),
});

const RawCourseInstance = z.object({
	ID: Id, // activity ID
	INSTANCEID: z.number().int().positive(),
	NAME: z.string(),
	STARTDATE: AxcelerateDateTime,
	FINISHDATE: AxcelerateDateTime,
	DATEDESCRIPTOR: z.string(),
	LOCATION: z.string(),
	COST: z.number(),
	GST_TYPE: GSTType,
	OWNERCONTACTID: z.number().int().positive(),
	TRAINERCONTACTID: z.number().int().positive(),
	NOTICES: z.string().nullable(),
	PARTICIPANTS: z.number().int().nonnegative(),
	MAXPARTICIPANTS: z.number().int().nonnegative(),
	MINPARTICIPANTS: z.number().int().nonnegative(),
	PARTICIPANTVACANCY: z.number().int().nonnegative(),
	ENROLMENTOPEN: z.boolean(),
	LASTUPDATEDUTC: AxcelerateDateTime,
	ISACTIVE: z.boolean(),
	STATUS: z.string().nullable(),
});

export const CourseInstance = RawCourseInstance.transform((r) => ({
	id: r.ID,
	instanceId: r.INSTANCEID,
	name: r.NAME,
	startDate: r.STARTDATE,
	finishDate: r.FINISHDATE,
	dateDescriptor: r.DATEDESCRIPTOR,
	location: r.LOCATION,
	cost: r.COST,
	gstType: r.GST_TYPE,
	ownerContactId: r.OWNERCONTACTID,
	trainerContactId: r.TRAINERCONTACTID,
	notices: r.NOTICES,
	participants: r.PARTICIPANTS,
	maxParticipants: r.MAXPARTICIPANTS,
	minParticipants: r.MINPARTICIPANTS,
	participantVacancy: r.PARTICIPANTVACANCY,
	enrolmentOpen: r.ENROLMENTOPEN,
	lastUpdatedUtc: r.LASTUPDATEDUTC,
	isActive: r.ISACTIVE,
	status: r.STATUS,
}));

export const GetCourseInstancesResponse = z.array(CourseInstance);

export const GetCourseInstances = {
	query: GetCourseInstancesQuery,
	responses: {
		200: GetCourseInstancesResponse,
		204: GetCourseInstancesResponse.length(0),
	},
} satisfies QueryEndpointSchemas;
