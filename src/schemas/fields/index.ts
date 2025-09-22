import z from "zod";

export * from "./datetime";
export * from "./pagination";
export * from "./sorting";
export * from "./id";

export const GSTType = z.union([z.literal(0), z.literal(1), z.literal(2)]);

// Course Fields
export const ActivityType = z.enum(["w", "p", "el"]);
export const ActivityTypeFilter = z.union([ActivityType, z.enum(["all"])]);
