import { RequestHeaders } from "./types";

export function parseHeadersForFetch(
	headers: RequestHeaders,
): [string, string][] {
	return Object.entries(headers).map(([key, value]) => {
		return [key, parseHttpHeaderAsString(value)];
	});
}

export function parseHttpHeaderAsString<K extends keyof RequestHeaders>(
	header: RequestHeaders[K],
): string {
	if (Array.isArray(header)) {
		return header.join(", ");
	}
	return String(header);
}
