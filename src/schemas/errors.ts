import { z } from "zod";

export const AxcelerateError = z
	.object({
		DATA: z.string(),
		ERROR: z.boolean(),
		MESSAGES: z.string(),
		CODE: z.string(),
		DETAILS: z.string(),
	})
	.transform((r) => ({
		data: r.DATA,
		error: r.ERROR,
		messages: r.MESSAGES,
		code: r.CODE,
		details: r.DETAILS,
	}));
