import type { z } from "zod";

import {
	CreateEnrolBody,
	CreateEnrolmentResponse,
	CreateEnrolMultipleBody,
	CreateEnrolMultipleResponse,
} from "../../../src/contract/courses/enrolment.schema";

export const enrolRequestBody: z.input<typeof CreateEnrolBody> = {
	contactID: 10,
	instanceID: 5001,
	type: "w",
};

export const enrolResponse: z.input<typeof CreateEnrolmentResponse> = {
	INVOICEID: 9001,
	CONTACTID: 10,
	LEARNERID: 6001,
	AMOUNT: 250,
};

export const enrolMultipleRequestBody: z.input<typeof CreateEnrolMultipleBody> =
	{
		contactID: [10, 11],
		instanceID: 5001,
		payerID: 7001,
		type: "w",
	};

export const enrolMultipleResponse: z.input<
	typeof CreateEnrolMultipleResponse
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
