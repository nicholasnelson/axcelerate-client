import { describe, it, expect, afterAll } from "vitest";

import {
	assertStatus,
	createDefaultAxcelerateClient,
	setupMockClient,
} from "./util";
import {
	contactNoteBody,
	contactNoteRawResponse,
	contactRawResponse,
	createContactBody,
	createContactRawResponse,
	searchContactsRawResponse,
	updateContactBody,
	verifyUsiRawResponse,
} from "./fixtures/contacts";

const { agent, client } = setupMockClient();

describe("contacts", () => {
	afterAll(() => {
		agent.clearCallHistory();
		client.cleanMocks();
	});

	it("creates a contact", async () => {
		client
			.intercept({
				path: "/api/contact/",
				method: "POST",
			})
			.reply(200, JSON.stringify(createContactRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().contacts.createContact({
			body: createContactBody,
		});

		assertStatus(out, 200);
		expect(out.body.contactId).toBe(createContactRawResponse.CONTACTID);
		expect(out.body.givenName).toBe(createContactRawResponse.GIVENNAME);
	});

	it("updates a contact", async () => {
		client
			.intercept({
				path: "/api/contact/201",
				method: "PUT",
			})
			.reply(200, JSON.stringify(createContactRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().contacts.updateContact({
			params: { contactId: 201 },
			body: updateContactBody,
		});

		assertStatus(out, 200);
		expect(out.body.contactId).toBe(createContactRawResponse.CONTACTID);
	});

	it("retrieves a contact", async () => {
		client
			.intercept({
				path: "/api/contact/201",
				method: "GET",
			})
			.reply(200, JSON.stringify(contactRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().contacts.getContact({
			params: { contactId: 201 },
			query: {},
		});

		assertStatus(out, 200);
		expect(out.body.contactId).toBe(contactRawResponse.CONTACTID);
		expect(out.body.organisation).toBe(contactRawResponse.ORGANISATION);
	});

	it("searches contacts", async () => {
		client
			.intercept({
				path: "/api/contacts/search",
				query: { search: "Jane" },
				method: "GET",
			})
			.reply(200, JSON.stringify(searchContactsRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().contacts.searchContacts({
			query: { search: "Jane" },
		});

		assertStatus(out, 200);
		expect(out.body).toHaveLength(1);
		expect(out.body[0].surname).toBe(contactRawResponse.SURNAME);
	});

	it("verifies a USI", async () => {
		client
			.intercept({
				path: "/api/contact/verifyUSI",
				method: "POST",
			})
			.reply(200, JSON.stringify(verifyUsiRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().contacts.verifyUSI({
			body: { contactID: 201 },
		});

		assertStatus(out, 200);
		expect(out.body.usiVerified).toBe(true);
		expect(out.body.data?.firstName).toBe(verifyUsiRawResponse.DATA?.firstName);
	});

	it("creates a contact note", async () => {
		client
			.intercept({
				path: "/api/contact/note",
				method: "POST",
			})
			.reply(200, JSON.stringify(contactNoteRawResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out =
			await createDefaultAxcelerateClient().contacts.createContactNote({
				body: contactNoteBody,
			});

		assertStatus(out, 200);
		expect(out.body.noteId).toBe(contactNoteRawResponse.NOTEID);
	});
});
