// tests/courseDetail.min.test.ts
import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "../src/client";
import { mockApi } from "./setup";
import { ZodError } from "zod";

const base = "https://api.axcelerate.com";

describe("CourseDetail", () => {
	it("builds correct query and parses program detail", async () => {
		const { pool } = mockApi(base);
		const body = {
			OUTLINE: "Outline",
			CODE: "CUF40107",
			COST: 3000,
			GST_TYPE: 1,
			NAME: "Cert IV in Spline Media",
			ID: 4539,
			TYPE: "p",
			DESCRIPTION: "Desc",
			LASTUPDATEDUTC: "2021-03-16 23:40",
		};
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/detail?ID=4539&type=p",
				headers: { apitoken: "x", wstoken: "y" }, // assert headers present
			})
			.reply(200, body, { headers: { "content-type": "application/json" } });

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		const out = await ax.courseDetail.get({ id: 4539, type: "p" });

		expect(out.TYPE).toBe("p");
		expect(out.CODE).toBe("CUF40107");
	});

	it("throws ApiError on non-2xx", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/detail?ID=999&type=w",
			})
			.reply(503, "unavailable");

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(ax.courseDetail.get({ id: 999, type: "w" })).rejects.toThrow(
			/HTTP 503/,
		);
	});

	it("fails fast on invalid shape (ZodError)", async () => {
		const { pool } = mockApi(base);
		// Missing CODE triggers schema failure
		const bad = {
			OUTLINE: "Outline",
			COST: 100,
			GST_TYPE: 0,
			NAME: "Bad",
			ID: 1,
			TYPE: "p",
			DESCRIPTION: "Bad",
			LASTUPDATEDUTC: "2021-03-16 23:40",
		};
		pool
			.intercept({
				method: "GET",
				path: "/v2/course/detail?ID=1&type=p",
			})
			.reply(200, bad, { headers: { "content-type": "application/json" } });

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(
			ax.courseDetail.get({ id: 1, type: "p" }),
		).rejects.toBeInstanceOf(ZodError);
	});
});
