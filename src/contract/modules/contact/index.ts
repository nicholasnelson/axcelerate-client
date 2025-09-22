import { initContract } from "@ts-rest/core";

import { create } from "./create";
import { get } from "./get";
import { noteRouter } from "./note";
import { search } from "./search";
import { update } from "./update";
import { verifyUsi } from "./verifyUsi";

export const contact = initContract().router({
	note: noteRouter,
	create,
	update,
	get,
	search,
	verifyUsi,
});
