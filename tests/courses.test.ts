import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { mockApi } from "./setup";
import { courseList } from "./fixtures/courses";

const base = "https://api.axcelerate.com";

describe("course", () => {
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

		const out = await ax.course.list({ limit: 2 });
		expect(out).toHaveLength(2);
		expect(out[0].NAME).toBe(courseList[0].NAME);
		expect(out[0].GST_TYPE).toBe(courseList[0].GST_TYPE);
	});
});
