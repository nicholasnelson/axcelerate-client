import type { z } from "zod";

import { GetCourseInstances } from "@schemas/course/instance";

export const courseInstancesResponse: z.input<
	(typeof GetCourseInstances.responses)[200]
> = [
	{
		ID: 101,
		INSTANCEID: 5001,
		NAME: "Workshop Fundamentals",
		STARTDATE: "2024-02-01 09:00",
		FINISHDATE: "2024-02-01 17:00",
		DATEDESCRIPTOR: "One day",
		LOCATION: "Sydney",
		COST: 250,
		GST_TYPE: 1,
		OWNERCONTACTID: 200,
		TRAINERCONTACTID: 300,
		NOTICES: null,
		PARTICIPANTS: 10,
		MAXPARTICIPANTS: 20,
		MINPARTICIPANTS: 1,
		PARTICIPANTVACANCY: 10,
		ENROLMENTOPEN: true,
		LASTUPDATEDUTC: "2024-01-10 09:00",
		ISACTIVE: true,
		STATUS: "Open",
	},
];
