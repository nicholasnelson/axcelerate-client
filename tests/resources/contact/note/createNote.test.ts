import { describe, it, expect } from "vitest";
import { AxcelerateClient } from "axcelerate-client";
import { noteSuccess } from "./createNote.fixtures";
import { mockApi } from "../../../setup";

const base = "https://api.axcelerate.com";

describe("contact.note", () => {
	it("adds a note and returns typed result", async () => {
		const { pool } = mockApi(base);
		pool
			.intercept({ method: "POST", path: "/v2/contact/note/" })
			.reply(200, noteSuccess, {
				headers: { "content-type": "application/json" },
			});

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		const out = await ax.contact.note.create({
			contactID: 116482,
			contactNote: "Hello world",
			emailNote: "123,456",
		});

		expect(out.noteId).toBe(noteSuccess.NOTEID);
		expect(out.status).toBe(noteSuccess.STATUS);
		expect(out.message).toMatch(/Note was added/);
	});

	it("rejects invalid request body", async () => {
		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			// contactNote must be non-empty
			ax.contact.note.create({ contactID: 116482, contactNote: "" }),
		).rejects.toThrow();
	});

	it("fails on invalid response shape", async () => {
		const { pool } = mockApi(base);
		const bad = { ...noteSuccess, NOTEID: "oops" as unknown as number };
		pool
			.intercept({ method: "POST", path: "/v2/contact/note/" })
			.reply(200, bad, { headers: { "content-type": "application/json" } });

		const ax = new AxcelerateClient({
			apiToken: "x",
			wsToken: "y",
			baseUrl: base + "/v2/",
		});

		await expect(
			ax.contact.note.create({ contactID: 116482, contactNote: "Hello world" }),
		).rejects.toThrow();
	});
});
