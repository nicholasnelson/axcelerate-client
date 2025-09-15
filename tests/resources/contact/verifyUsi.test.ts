import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { usiSuccess, usiMismatch, usiMissingData } from "./verifyUsi.fixtures";
import { mockApi } from "../../setup";

const base = "https://api.axcelerate.com";

describe("contact.verifyUsi", () => {
	it("verifies successfully", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/contact/verifyUSI" })
			.reply(200, usiSuccess, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.contact.verifyUsi({ contactID: 708861 });
		expect(out.usiVerified).toBe(true);
		expect(out.data?.usiStatus).toBe("Valid");
		expect(out.data?.firstName).toBe("MATCH");
		expect(out.msg).toMatch(/Verified successfully/);
	});

	it("returns mismatch details", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/contact/verifyUSI" })
			.reply(200, usiMismatch, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.contact.verifyUsi({ contactID: 708861 });
		expect(out.usiVerified).toBe(false);
		expect(out.data?.firstName).toBe("NO_MATCH");
		expect(out.data?.familyName).toBe("MATCH");
		expect(out.msg).toMatch(/does not match/i);
	});

	it("handles missing DATA block", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/contact/verifyUSI" })
			.reply(200, usiMissingData, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.contact.verifyUsi({ contactID: 708861 });
		expect(out.usiVerified).toBe(false);
		expect(out.data).toBeUndefined();
		expect(out.msg).toMatch(/error exists/i);
	});

	it("rejects invalid request body", async () => {
		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});
		await expect(
			// contactID must be positive int
			ax.contact.verifyUsi({ contactID: 0 }),
		).rejects.toThrow();
	});
});
