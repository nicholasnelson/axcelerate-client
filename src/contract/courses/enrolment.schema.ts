import { z } from "zod";
import { ActivityType, AxcelerateDateTime, GSTType, Id } from "../../schemas";

/** POST /course/enrolment */
export const CreateEnrolBody = z.object({
	contactID: Id,
	instanceID: z.number().int().positive(),
	type: ActivityType,

	tentative: z.boolean().optional(),
	payerID: z.number().int().positive().optional(),
	invoiceID: z.number().int().nonnegative().optional(),
	PONumber: z.string().optional(),
	generateInvoice: z.boolean().optional(),
	lockInvoiceItems: z.boolean().optional(),
	archiveInvoice: z.boolean().optional(),
	forceBooking: z.boolean().optional(),

	// program-only switches
	bookOnDefaultWorkshops: z.boolean().optional(),
	syncDatesWithWorkshop: z.boolean().optional(),
	syncUOCdates: z.boolean().optional(),
	syncWithClassSchedule: z.boolean().optional(),

	GST_type: GSTType.optional(),

	autoGrantCT: z.boolean().optional(),
	dateCommenced: AxcelerateDateTime.optional(),
	dateCompletionExpected: z.string().optional(),

	suppressNotifications: z.boolean().optional(),
	sendAdminNotification: z.boolean().optional(),
	blockAdminNotification: z.boolean().optional(),
	useRegistrationFormDefaults: z.boolean().optional(),

	StudyReasonID: z.number().int().optional(),
	FundingNational: z.number().int().optional(),
	FundingState: z.string().optional(),

	marketingAgentContactID: z.number().int().optional(),
	serviceDate: z.string().optional(),
	cost: z.number().optional(),
	commencingProgramCohortIdentifiers: z.string().optional(),
	discountIDList: z.string().optional(),

	PSTACDateVIC: z.string().optional(),
	commencedWhileAtSchool: z.boolean().optional(),
});

const RawCreateEnrolmentResponse = z.object({
	INVOICEID: z.number().int().nonnegative(),
	CONTACTID: z.number().int().positive(),
	LEARNERID: z.number().int().positive(),
	AMOUNT: z.number(),
});

export const CreateEnrolmentResponse = RawCreateEnrolmentResponse.transform(
	(r) => ({
		invoiceId: r.INVOICEID,
		contactId: r.CONTACTID,
		learnerId: r.LEARNERID,
		amount: r.AMOUNT,
	}),
);

// Accept array | single | preformatted "1,2,3", and emit comma-delimited string.
const ContactIdList = z
	.union([z.array(Id).min(1), Id, z.string().regex(/^\d+(?:,\d+)*$/)])
	.transform((v) =>
		Array.isArray(v) ? v.join(",") : typeof v === "number" ? String(v) : v,
	);

/** POST /course/enrolMultiple — body */
export const CreateEnrolMultipleBody = z.object({
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

	GST_type: GSTType.optional(),
	autoGrantCT: z.boolean().optional(),
	dateCommenced: AxcelerateDateTime.optional(),
	dateCompletionExpected: z.string().optional(),
});

/** Response = array of the single-enrol response shape */
export const CreateEnrolMultipleResponse = z.array(CreateEnrolmentResponse);
