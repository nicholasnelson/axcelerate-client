import type { z } from "zod";

import { CreateEnrol, CreateEnrolMultiple } from "@schemas/course/enrolment";

export const enrolRequestBody: z.input<typeof CreateEnrol.body> = {
	contactID: 10,
	instanceID: 5001,
	type: "w",
};

export const enrolResponse: z.input<(typeof CreateEnrol.responses)[200]> = {
	INVOICEID: 9001,
	CONTACTID: 10,
	LEARNERID: 6001,
	AMOUNT: 250,
};

export const enrolMultipleRequestBody: z.input<
	typeof CreateEnrolMultiple.body
> = {
	contactID: [10, 11],
	instanceID: 5001,
	payerID: 7001,
	type: "w",
};

export const enrolMultipleResponse: z.input<
	(typeof CreateEnrolMultiple.responses)[200]
> = [
	{
		INVOICEID: 9001,
		CONTACTID: 10,
		LEARNERID: 6001,
		AMOUNT: 250,
	},
	{
		INVOICEID: 9002,
		CONTACTID: 11,
		LEARNERID: 6002,
		AMOUNT: 250,
	},
];
