import { initContract } from "@ts-rest/core";
import { get } from "./get";

export const detailRouter = initContract().router({
	get,
});
