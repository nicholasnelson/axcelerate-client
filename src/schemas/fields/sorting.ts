import z from "zod";

export const Sorting = z.object({
	sortColumn: z.number().int().nonnegative().optional(),
	sortDirection: z.enum(["ASC", "DESC"]).optional(),
});
