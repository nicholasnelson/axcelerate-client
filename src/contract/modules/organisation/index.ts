import { initContract } from "@ts-rest/core";

import { search } from "./search";

const c = initContract();

export const organisation = c.router({
	search,
});
