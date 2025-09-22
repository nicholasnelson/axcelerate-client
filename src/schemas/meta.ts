import type { ZodType } from "zod";

type ResponsesWith200 = { 200: ZodType } & Record<number, ZodType>;

export type QueryEndpointSchemas = {
	pathParams?: ZodType;
	query?: ZodType;
	responses: ResponsesWith200;
};

export type MutationEndpointSchemas = {
	pathParams?: ZodType;
	body: ZodType;
	responses: ResponsesWith200;
};
