import { z } from "zod";
export const Sex = z.enum(["M", "F", "X"]);
export const AUStateOrOVS = z.enum([
	"NSW",
	"VIC",
	"QLD",
	"SA",
	"WA",
	"TAS",
	"NT",
	"ACT",
	"OTH",
	"OVS",
]);
export const SACCCode = z.number().int().min(0).max(9999);
export const USI = z.string().regex(/^[A-HJ-NP-Z2-9]{10}$/);
export const LUI = z.string().regex(/^\d{10}$/);
export const SACEStudentID = z.string().regex(/^\d{6}[A-Z]$/);
export const Year = z.number().int().min(1900).max(new Date().getFullYear());
