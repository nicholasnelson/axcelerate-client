import { initContract } from "@ts-rest/core";

import { AxcelerateError } from "@schemas/errors";
import { contact } from "./modules/contact";
import { course } from "./modules/course";
import { organisation } from "./modules/organisation";

const c = initContract();

export const contract = c.router(
	{
		contact,
		course,
		organisation,
	},
	{
		commonResponses: {
			404: AxcelerateError,
			422: AxcelerateError,
		},
	},
);

export type AppContract = typeof contract;
