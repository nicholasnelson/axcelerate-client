// src/util/schemas.ts
import { z } from "zod";

export const Id = z.number().int().positive();
export const AxcelerateDate = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

export const NonNegInt = z.number().int().nonnegative();

export const Pagination = z.object({
	limit: NonNegInt.optional(),
	offset: NonNegInt.optional(),
});
export type Pagination = z.infer<typeof Pagination>;
