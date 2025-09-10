import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "../src/client";
import { mockApi } from "./setup";
import { instancesSample } from "./fixtures/courseInstances";
import { ZodError } from "zod";

const base = "https://api.axcelerate.com";

describe("CourseInstances", () => {
	it("builds query and parses list", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/instances?ID=16380&type=w&public=false&current=false",
				headers: { apitoken: "x", wstoken: "y" },
			})
			.reply(200, instancesSample, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		const out = await ax.courseInstances.list({
			id: 16380,
			type: "w",
			public: false,
			current: false,
		});

		expect(out).toHaveLength(2);
		expect(out[0].INSTANCEID).toBe(407209);
	});

	it("throws ApiError on non-2xx", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/instances?ID=1&type=p",
			})
			.reply(503, "unavailable");

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(ax.courseInstances.list({ id: 1, type: "p" })).rejects.toThrow(
			/HTTP 503/,
		);
	});

	it("fails on invalid shape", async () => {
		const { pool } = mockApi(base);
		const bad = [{ ...instancesSample[0], NAME: 123 }]; // invalid type
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/instances?ID=2&type=el",
			})
			.reply(200, bad, { headers: { "content-type": "application/json" } });

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(
			ax.courseInstances.list({ id: 2, type: "el" }),
		).rejects.toBeInstanceOf(ZodError);
	});
});
