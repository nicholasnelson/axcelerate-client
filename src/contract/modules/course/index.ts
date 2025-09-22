import { initContract } from "@ts-rest/core";

import { detailRouter } from "./detail";
import { instanceRouter } from "./instance";

import { enrol } from "./enrol";
import { enrolMultiple } from "./enrolMultiple";
import { get } from "./get";

export const course = initContract().router({
	get,
	enrol,
	enrolMultiple,
	detail: detailRouter,
	instance: instanceRouter,
});
