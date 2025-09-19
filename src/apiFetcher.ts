import { ApiFetcher, isZodType } from "@ts-rest/core";
import { ZodArray } from "zod";

/**
 * Default fetch api implementation
 * - modified to support the empty response with status 204 when axcelerate found no results
 *
 */
export const apiFetcher: ApiFetcher = async ({
	route,
	path,
	method,
	headers,
	body,
	validateResponse,
	fetchOptions,
}) => {
	const result = await fetch(path, {
		...fetchOptions,
		method,
		headers,
		body,
	});
	const contentType = result.headers.get("content-type");
	if (
		(contentType === null || contentType === void 0
			? void 0
			: contentType.includes("application/")) &&
		(contentType === null || contentType === void 0
			? void 0
			: contentType.includes("json"))
	) {
		const responseSchema = route.responses[result.status];
		const response = {
			status: result.status,
			body: await result.json().catch((e) => {
				if (
					result.status === 204 &&
					e?.message === "Unexpected end of JSON input" &&
					responseSchema instanceof ZodArray
				) {
					return [];
				} else throw e;
			}),
			headers: result.headers,
		};
		if (
			(validateResponse !== null && validateResponse !== void 0
				? validateResponse
				: route.validateResponseOnClient) &&
			isZodType(responseSchema)
		) {
			return {
				...response,
				body: responseSchema.parse(response.body),
			};
		}
		return response;
	}
	if (
		contentType === null || contentType === void 0
			? void 0
			: contentType.includes("text/")
	) {
		return {
			status: result.status,
			body: await result.text(),
			headers: result.headers,
		};
	}
	return {
		status: result.status,
		body: await result.blob(),
		headers: result.headers,
	};
};
