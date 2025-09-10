import { z } from "zod";
import { Id } from "../util/schemas";
import { ActivityType } from "./courseDetail.schemas";

export const EnrolRequest = z.object({
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

	applyGST: z.boolean().optional(), // deprecated
	GST_type: z.number().int().optional(), // 0|1

	autoGrantCT: z.boolean().optional(),
	dateCommenced: z.string().optional(), // 'YYYY-MM-DD' (or date string your side)
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

	// custom fields -> becomes customField_[key]
	customFields: z
		.record(z.string(), z.union([z.string(), z.array(z.string())]))
		.optional(),

	PSTACDateVIC: z.string().optional(),
	commencedWhileAtSchool: z.boolean().optional(),
});
export type EnrolRequest = z.infer<typeof EnrolRequest>;

export const EnrolResponse = z.object({
	INVOICEID: z.number().int().nonnegative(),
	CONTACTID: z.number().int().positive(),
	LEARNERID: z.number().int().positive(),
	AMOUNT: z.number(),
});
export type EnrolResponse = z.infer<typeof EnrolResponse>;
