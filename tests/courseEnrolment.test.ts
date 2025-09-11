import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { mockApi } from "./setup";
import { ZodError } from "zod";

const base = "https://api.axcelerate.com";

describe("course.enrolment", () => {
	it("POSTs form-encoded body and parses response", async () => {
		const enrolOk = {
			INVOICEID: 61648,
			CONTACTID: 952989,
			LEARNERID: 507096,
			AMOUNT: 490,
		};

		const { pool } = mockApi(base);
		pool
			.intercept({
				method: "POST",
				path: "/v2/course/enrol",
				headers: {
					apitoken: "x",
					wstoken: "y",
					"content-type": "application/x-www-form-urlencoded",
				},
			})
			.reply(200, enrolOk, { headers: { "content-type": "application/json" } });

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		const out = await ax.course.enrolment.create({
			contactID: 123,
			instanceID: 456,
			type: "w",
			tentative: true,
			generateInvoice: true,
		});

		expect(out.LEARNERID).toBe(enrolOk.LEARNERID);
	});

	it("validates request shape before sending", async () => {
		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(
			// @ts-expect-error invalid type string
			ax.course.enrolment.create({ contactID: 1, instanceID: 2, type: "x" }),
		).rejects.toBeInstanceOf(ZodError);
	});

	it("maps non-2xx to ApiError", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/course/enrol" })
			.reply(400, "bad request");

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(
			ax.course.enrolment.create({ contactID: 1, instanceID: 2, type: "w" }),
		).rejects.toThrow(/HTTP 400/);
	});
});
