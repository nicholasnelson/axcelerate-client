export type RequestHeaders = Record<string, string | number | string[]>;
export type RequestData = Record<string, unknown>;

export type ResponseHeaderValue = string | string[];
export type ResponseHeaders = Record<string, ResponseHeaderValue>;

export type MethodSpec = {
	method: "GET" | "POST" | "PUT";
	path: string;
};
