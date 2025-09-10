export class ApiError extends Error {
	constructor(
		public status: number,
		public url: string,
		public body?: string,
	) {
		super(`HTTP ${status} ${url}${body ? `: ${body}` : ""}`);
	}
}
