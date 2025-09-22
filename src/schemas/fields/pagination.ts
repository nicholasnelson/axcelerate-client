import z from "zod";

export const Pagination = z.object({
	offset: z.number().int().nonnegative().optional(),
	displayLength: z.number().int().nonnegative().optional(),
});
