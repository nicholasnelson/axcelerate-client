import { AxcelerateEndpoint } from "./endpoint";
import { EnrolRequest, EnrolResponse } from "./courseEnrol.schemas";

function toForm(req: EnrolRequest): URLSearchParams {
	const r = EnrolRequest.parse(req);
	const params = new URLSearchParams();

	const entries: [string, unknown][] = Object.entries(r).flatMap(([k, v]) => {
		if (k === "customFields" || v === undefined) return [];
		return [[k, v]];
	});

	for (const [k, v] of entries) {
		params.append(k, typeof v === "boolean" ? String(v) : String(v));
	}

	if (r.customFields) {
		for (const [key, val] of Object.entries(r.customFields)) {
			const out = Array.isArray(val) ? JSON.stringify(val) : val;
			params.append(`customField_${key}`, out);
		}
	}
	return params;
}

export class CourseEnrol extends AxcelerateEndpoint {
	async enrol(req: EnrolRequest) {
		const form = toForm(req);
		const data = await this.http.postForm<unknown>("course/enrol", form);
		return EnrolResponse.parse(data);
	}
}
