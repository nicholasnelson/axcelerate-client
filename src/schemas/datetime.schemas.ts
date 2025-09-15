import { z } from "zod";

// Time -> "15:04"
export const AxcelerateTime = z
	.string()
	.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)");
export type AxcelerateTime = z.infer<typeof AxcelerateTime>;

// TimeLong -> "15:04:05"
export const AxcelerateTimeLong = z
	.string()
	.regex(
		/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
		"Invalid time format (HH:MM:SS)",
	);
export type AxcelerateTimeLong = z.infer<typeof AxcelerateTimeLong>;

// Date -> "2006-01-02"
export const AxcelerateDate = z
	.string()
	.regex(
		/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
		"Invalid date format (YYYY-MM-DD)",
	);
export type AxcelerateDate = z.infer<typeof AxcelerateDate>;

// DateTime -> "2006-01-02 15:04"
export const AxcelerateDateTime = z
	.string()
	.regex(
		/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d)$/,
		"Invalid datetime format (YYYY-MM-DD HH:MM)",
	);
export type AxcelerateDateTime = z.infer<typeof AxcelerateDateTime>;
