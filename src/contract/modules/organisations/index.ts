import { initContract } from "@ts-rest/core";

import {
	SearchOrganisationsQuery,
	SearchOrganisationsResponseList,
} from "./schemas/search.schema";

const c = initContract();

export const organisations = c.router({
	search: {
		method: "GET",
		path: "/organisations/",
		query: SearchOrganisationsQuery,
		responses: {
			200: SearchOrganisationsResponseList,
		},
		summary: "Search organisations",
	},
});
