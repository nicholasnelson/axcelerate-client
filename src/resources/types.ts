import z from "zod";

export const ActivityType = z.union([
	z.literal("w"),
	z.literal("p"),
	z.literal("el"),
]);

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);
export const Id = z.number().int().positive();

export const AxcelerateDate = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
export type AxcelerateDate = z.infer<typeof AxcelerateDate>;

export const NonNegInt = z.number().int().nonnegative();

export const Pagination = z.object({
	limit: NonNegInt.optional(),
	offset: NonNegInt.optional(),
});
export type Pagination = z.infer<typeof Pagination>;
