import z from "zod";
export { AxcelerateError } from "./errors";

export * from "./datetime.schemas";

const NonNegInt = z.number().int().nonnegative();

export const Pagination = z.object({
	offset: NonNegInt.optional(),
	displayLength: NonNegInt.optional(),
});

export const Sorting = z.object({
	sortColumn: NonNegInt.optional(),
	sortDirection: z.enum(["ASC", "DESC"]).optional(),
});

export const ActivityType = z.union([
	z.literal("w"),
	z.literal("p"),
	z.literal("el"),
]);

export const Id = z.number().int().positive();
export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export const CourseTypeFilter = z.enum(["w", "p", "el", "all"]);
