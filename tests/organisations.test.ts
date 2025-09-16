import { describe, it, expect, afterAll } from "vitest";

import {
	assertStatus,
	createDefaultAxcelerateClient,
	setupMockClient,
} from "./util";
import {
	organisationSearchQuery,
	organisationSearchResponse,
} from "./fixtures/organisations/search";

const { agent, client } = setupMockClient();

describe("organisations", () => {
	afterAll(() => {
		agent.clearCallHistory();
		client.cleanMocks();
	});

	it("searches organisations", async () => {
		client
			.intercept({
				path: "/api/organisations/",
				method: "GET",
				query: organisationSearchQuery,
			})
			.reply(200, JSON.stringify(organisationSearchResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().organisations.search({
			query: organisationSearchQuery,
		});

		assertStatus(out, 200);
		expect(out.body).toHaveLength(organisationSearchResponse.length);
		expect(out.body[0].orgId).toBe(organisationSearchResponse[0].ORGID);
	});
});
