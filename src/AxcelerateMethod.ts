import z from "zod";
import type { AxcelerateResource } from "./AxcelerateResource";
import { MethodSpec, RequestData } from "./types";

export function axcelerateMethod<
	Req extends z.ZodType<RequestData>,
	Res extends z.ZodType,
>(requestSchema: Req, responseSchema: Res, spec: MethodSpec) {
	type Input = z.input<Req>;
	type Output = z.output<Res>;

	// Derive a stable, debuggable function name
	const base = `${spec.method || "REQ"}_${spec.path || ""}`;
	let name = base.replace(/[^\w$]+/g, "_");
	if (!/^[A-Za-z_$]/.test(name)) name = `m_${name}`;
	if (!name) name = "axcelerate_method";

	const fn = {
		[name]: async function (
			this: AxcelerateResource,
			request: Input,
		): Promise<Output> {
			const parsedRequest = requestSchema.parse(request);
			const response = await this.makeRequest(parsedRequest, spec);
			return await responseSchema.parse(await response.json());
		},
	}[name] as (this: AxcelerateResource, request: Input) => Promise<Output>;

	// Ensure V8 keeps the name even through bundling
	Object.defineProperty(fn, "name", { value: name });

	return fn;
}
