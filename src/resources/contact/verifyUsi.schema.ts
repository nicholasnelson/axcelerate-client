import { z } from "zod";

/** POST /contact/verifyUSI — body */
export const VerifyUSIBody = z.object({
	contactID: z.number().int().positive(),
});

/** Reusable match enum seen in samples */
export const USIMatch = z.enum(["MATCH", "NO_MATCH"]);

/** Raw response (per samples). DATA may be absent on errors. */
const RawVerifyUSIResponse = z
	.object({
		USI_VERIFIED: z.boolean(),
		DATA: z
			.object({
				usiStatus: z.string(), // docs don’t define enum; keep as string
				firstName: USIMatch,
				familyName: USIMatch,
				dateOfBirth: USIMatch,
			})
			.optional(),
		MSG: z.string(),
	})
	.strict();

/** Transformed response */
export const VerifyUSIResponse = RawVerifyUSIResponse.transform((r) => ({
	usiVerified: r.USI_VERIFIED,
	msg: r.MSG,
	...(r.DATA ? { data: r.DATA } : {}),
}));
