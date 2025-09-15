import { MockAgent, setGlobalDispatcher } from "undici";
import { createAxcelerateClient } from "../src/index";
import { expect } from "vitest";

const TEST_BASE_ORIGIN = "https://api.axcelerate.com.au";
const TEST_BASE_PATH = "/api/";

export const createDefaultAxcelerateClient = () =>
	createAxcelerateClient({
		baseUrl: TEST_BASE_ORIGIN + TEST_BASE_PATH,
		apiToken: "example-api-token",
		wsToken: "example-ws-token",
	});

export const setupMockClient = () => {
	const agent = new MockAgent();
	agent.disableNetConnect();
	const client = agent.get(TEST_BASE_ORIGIN);
	setGlobalDispatcher(agent);
	agent.enableCallHistory();
	return { agent, client };
};

// Assert the status of the response so we can use the discriminated union typing of body
export function assertStatus<S extends number, R extends { status: number }>(
	res: R,
	status: S,
): asserts res is Extract<R, { status: S }> {
	if (res.status !== status)
		throw new Error(`expected ${status}, got ${res.status}`);
}

export function assertPropEq<T, K extends keyof T, const V extends T[K]>(
	obj: T,
	key: K,
	value: V,
): asserts obj is Extract<T, { [P in K]: V }> {
	expect(obj[key]).toEqual(value);
}
