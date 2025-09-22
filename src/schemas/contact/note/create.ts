import type { MutationEndpointSchemas } from "@schemas/meta";
import z from "zod";

export const CreateContactNote = {
	body: z.object({
		contactID: z.number().int().positive(),
		contactNote: z.string().min(1),
		noteTypeID: z.number().int().positive().optional(),
		// numeric-list per docs; pass as comma-delimited string
		emailNote: z.string().optional(),
	}),
	responses: {
		200: z
			.object({
				MESSAGE: z.string(),
				STATUS: z.string(),
				NOTEID: z.int().positive(),
			})
			.transform((r) => ({
				message: r.MESSAGE,
				status: r.STATUS,
				noteId: r.NOTEID,
			})),
	},
} satisfies MutationEndpointSchemas;
