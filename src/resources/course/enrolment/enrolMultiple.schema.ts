import { z } from "zod";
import { AxcelerateDateTime, GSTType, Id } from "../../../schemas";
import { CreateEnrolmentResponse } from "./create.schema";

// Accept array | single | preformatted "1,2,3", and emit comma-delimited string.
const ContactIdList = z
	.union([z.array(Id).min(1), Id, z.string().regex(/^\d+(?:,\d+)*$/)])
	.transform((v) =>
		Array.isArray(v) ? v.join(",") : typeof v === "number" ? String(v) : v,
	);

/** POST /course/enrolMultiple — body */
export const CreateEnrolMultipleQuery = z.object({
	contactID: ContactIdList, // required: numeric-list
	instanceID: z.number().int().positive(), // required
	// For this endpoint ONLY "w" is valid. Make optional (API applies default "w") but restrict if provided.
	type: z.literal("w").optional(),

	payerID: z.number().int().positive(), // required for multiple enrolment
	invoiceID: z.number().int().nonnegative().optional(),
	PONumber: z.string().optional(),

	generateInvoice: z.boolean().optional(),
	lockInvoiceItems: z.boolean().optional(),
	archiveInvoice: z.boolean().optional(),

	suppressNotifications: z.boolean().optional(),
	sendAdminNotification: z.boolean().optional(),
	blockAdminNotification: z.boolean().optional(),

	useRegistrationFormDefaults: z.boolean().optional(),
	marketingAgentContactID: z.number().int().optional(),
	serviceDate: z.string().optional(),

	// Program-only fields appear in docs for some reason
	// PSTACDateVIC: z.string().optional(),
	// commencedWhileAtSchool: z.boolean().optional(),
	// bookOnDefaultWorkshops: z.boolean().optional(),
	// syncDatesWithWorkshop: z.boolean().optional(),
	// syncWithClassSchedule: z.boolean().optional(),

	GST_type: GSTType.optional(),
	autoGrantCT: z.boolean().optional(),
	dateCommenced: AxcelerateDateTime.optional(),
	dateCompletionExpected: z.string().optional(),
});

/** Response = array of the single-enrol response shape */
export const CreateEnrolMultipleResponse = z.array(CreateEnrolmentResponse);
