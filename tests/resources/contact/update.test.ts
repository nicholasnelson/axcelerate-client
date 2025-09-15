import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { contactDetail } from "./update.fixtures";
import { mockApi } from "../../setup";

const base = "https://api.axcelerate.com";

describe("contact", () => {
	it("update returns typed contact", async () => {
		const { pool } = mockApi(base);
		const id = contactDetail.CONTACTID;
		pool
			.intercept({ method: "PUT", path: `/v2/contact/${id}` })
			.reply(200, contactDetail, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.contact.update(id, {
			emailAddress: "new.email@example.com",
		});

		expect(out.contactId).toBe(contactDetail.CONTACTID);
		expect(out.emailAddress).toBe(contactDetail.EMAILADDRESS);
		expect(out.givenName).toBe(contactDetail.GIVENNAME);
		expect(out.organisation).toBe(contactDetail.ORGANISATION);
		expect(out.categoryIds).toEqual(contactDetail.CATEGORYIDS);
		expect(out.domainIds).toEqual(contactDetail.DOMAINIDS);
	});

	it("rejects invalid request body (email)", async () => {
		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			// invalid email should be caught by Zod before any request
			ax.contact.update(123, { emailAddress: "not-an-email" }),
		).rejects.toThrow();
	});

	it("fails on invalid response shape", async () => {
		const { pool } = mockApi(base);
		const bad = { ...contactDetail, CONTACTID: "oops" as unknown as number };
		pool
			.intercept({
				method: "PUT",
				path: `/v2/contact/${contactDetail.CONTACTID}`,
			})
			.reply(200, bad, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			ax.contact.update(contactDetail.CONTACTID, { givenName: "Joe" }),
		).rejects.toThrow();
	});
});
