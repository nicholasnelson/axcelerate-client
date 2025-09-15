import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { mockApi } from "../../../../setup";
import { enrolMultipleSuccess } from "./enrolMultiple.fixtures";

const base = "https://api.axcelerate.com";

describe("course.enrolMultiple", () => {
	it("enrols multiple contacts and returns typed results", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/course/enrolMultiple" })
			.reply(200, enrolMultipleSuccess, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.course.enrolment.createMultiple({
			contactID: [14605, 15656],
			instanceID: 321,
			payerID: 4242,
			// type defaults to "w" at API; providing it is optional
		});

		expect(Array.isArray(out)).toBe(true);
		expect(out).toHaveLength(2);
		expect(out[0].invoiceId).toBe(enrolMultipleSuccess[0].INVOICEID);
		expect(out[0].contactId).toBe(enrolMultipleSuccess[0].CONTACTID);
		expect(out[0].learnerId).toBe(enrolMultipleSuccess[0].LEARNERID);
		expect(out[0].amount).toBe(enrolMultipleSuccess[0].AMOUNT);
	});

	it("rejects invalid request body (missing payerID)", async () => {
		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			// @ts-expect-error intentional for test
			ax.course.enrolment.createMultiple({
				contactID: [14605, 15656],
				instanceID: 321,
				// required fields omitted
			}),
		).rejects.toThrow();
	});

	it("fails on invalid response shape", async () => {
		const { pool } = mockApi(base);
		const bad = [
			{ ...enrolMultipleSuccess[0], INVOICEID: "oops" as unknown as number },
		];
		pool
			.intercept({ method: "POST", path: "/v2/course/enrolMultiple" })
			.reply(200, bad, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			ax.course.enrolment.createMultiple({
				contactID: [14605],
				instanceID: 321,
				payerID: 4242,
			}),
		).rejects.toThrow();
	});
});
