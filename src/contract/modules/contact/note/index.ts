import { initContract } from "@ts-rest/core";
import { create } from "./create";

export const noteRouter = initContract().router({
	create,
});
