import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "../src/client";
import { mockApi } from "./setup";
import { courseList, course42 } from "./fixtures/courses";

const base = "https://api.axcelerate.com";

describe("courses", () => {
	it("list returns typed items", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "GET", path: "/v2/courses?limit=2" })
			.reply(200, courseList.slice(0, 2), {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.courses.list({ limit: 2 });
		expect(out).toHaveLength(2);
		expect(out[0].NAME).toBe(courseList[0].NAME);
		expect(out[0].GST_TYPE).toBe(courseList[0].GST_TYPE);
	});

	it("get returns a single course", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "GET", path: "/v2/courses/42" })
			.reply(200, course42, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		const one = await ax.courses.get(42);

		expect(one.ID).toBe(42);
		expect(one.NAME).toBe(course42.NAME);
		expect(one.CODE).toBe("RET342");
	});
});
