import { initContract } from "@ts-rest/core";
import { get } from "./get";

export const instanceRouter = initContract().router({
	get,
});
