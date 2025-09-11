import { z } from "zod";
import { AxcelerateDate, GSTType, Id } from "./types";
import { ActivityType } from "./types";

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

	GST_type: GSTType.optional(),

	autoGrantCT: z.boolean().optional(),
	dateCommenced: AxcelerateDate.optional(),
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

export const EnrolResponse = z.object({
	INVOICEID: z.number().int().nonnegative(),
	CONTACTID: z.number().int().positive(),
	LEARNERID: z.number().int().positive(),
	AMOUNT: z.number(),
});
