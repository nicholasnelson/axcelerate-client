import { z } from "zod";
import type { AxcelerateResource } from "./AxcelerateResource";
import type { MethodSpec, RequestData } from "./types";

type ExtractPathParams<P extends string> = P extends `${string}:${infer Rest}`
	? Rest extends `${infer K}/${infer Tail}`
		? K | ExtractPathParams<Tail>
		: Rest
	: never;

type InputOf<T extends z.ZodTypeAny> = z.input<T>;
type OutputOf<T extends z.ZodTypeAny> = z.output<T>;

export function axcelerateMethod<
	Req extends z.ZodType<RequestData>,
	Res extends z.ZodTypeAny,
	Path extends string,
	PSchema extends z.ZodObject | undefined = undefined,
>(
	requestSchema: Req,
	responseSchema: Res,
	spec: MethodSpec & { path: Path; pathParamsSchema?: PSchema },
) {
	type Names = ExtractPathParams<Path>;
	type PathObjFromSchema =
		PSchema extends z.ZodObject<infer S>
			? z.input<z.ZodObject<S>>
			: Record<Names & string, string | number>;
	type SingleParamFromSchema =
		PSchema extends z.ZodObject<infer S>
			? z.input<z.ZodObject<S>>[Names & keyof z.input<z.ZodObject<S>>]
			: string | number;

	type Input = InputOf<Req>;
	type Output = OutputOf<Res>;

	function fillPath(path: string, params: Record<string, unknown>) {
		return path.replace(/:([A-Za-z0-9_]+)/g, (_, k: string) => {
			const v = params[k];
			if (v === undefined) throw new Error(`Missing path param "${k}"`);
			return encodeURIComponent(String(v));
		});
	}
	function extractNames(path: string): string[] {
		return Array.from(path.matchAll(/:([A-Za-z0-9_]+)/g)).map((m) => m[1]);
	}

	// Overloads:
	function fn(this: AxcelerateResource, request: Input): Promise<Output>;
	function fn(
		this: AxcelerateResource,
		pathParam: SingleParamFromSchema,
		request: Input,
	): Promise<Output>;
	function fn(
		this: AxcelerateResource,
		pathParams: PathObjFromSchema,
		request: Input,
	): Promise<Output>;

	async function fn(
		this: AxcelerateResource,
		a: unknown,
		b?: unknown,
	): Promise<Output> {
		const names = extractNames(spec.path);
		let request: Input;
		let pathParams: Record<string, unknown> | undefined;

		if (names.length === 0) {
			// signature: (request)
			request = a as Input;
		} else if (b === undefined) {
			throw new Error(
				"Path params required: provide value(s) and request body",
			);
		} else if (
			(typeof a === "string" ||
				typeof a === "number" ||
				typeof a === "boolean") &&
			names.length === 1
		) {
			// signature: (singleParam, request)
			pathParams = { [names[0]]: a };
			request = b as Input;
		} else if (a && typeof a === "object") {
			// signature: (paramsObject, request)
			pathParams = a as Record<string, unknown>;
			request = b as Input;
		} else {
			throw new Error("Invalid arguments for axcelerateMethod call");
		}

		const parsedRequest = requestSchema.parse(request);
		const parsedPathParams = pathParams
			? spec.pathParamsSchema
				? spec.pathParamsSchema.parse(pathParams)
				: pathParams
			: undefined;

		const path = parsedPathParams
			? fillPath(spec.path, parsedPathParams)
			: spec.path;

		const res = await this.makeRequest(parsedRequest, { ...spec, path });
		const json = await res.json();
		return responseSchema.parse(json);
	}

	// Keep a stable, readable name (optional)
	const base = `${spec.method || "REQ"}_${spec.path || ""}`.replace(
		/[^\w$]+/g,
		"_",
	);
	Object.defineProperty(fn, "name", { value: base || "axcelerate_method" });

	return fn;
}
