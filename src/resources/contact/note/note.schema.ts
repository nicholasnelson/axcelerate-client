import { z } from "zod";

/** Request body */
export const CreateContactNoteBody = z.object({
	contactId: z.number().int().positive(),
	contactNote: z.string().min(1),
	noteTypeId: z.number().int().positive().optional(),
	// numeric-list per docs; pass as comma-delimited string
	emailNote: z.string().optional(),
});

/** Raw response (sample shows success shape) */
const RawCreateContactNoteResponse = z
	.object({
		MESSAGE: z.string(),
		STATUS: z.string(),
		NOTEID: z.number().int().positive(),
	})
	.strict();

/** Transformed response */
export const CreateContactNoteResponse = RawCreateContactNoteResponse.transform(
	(r) => ({
		message: r.MESSAGE,
		status: r.STATUS,
		noteId: r.NOTEID,
	}),
);
