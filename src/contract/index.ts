import { initContract } from "@ts-rest/core";

import { courses } from "./modules/courses";
import { contacts } from "./modules/contacts";
import { organisations } from "./modules/organisations";
import { AxcelerateError } from "../schemas";

const c = initContract();

export const contract = c.router(
	{
		courses,
		contacts,
		organisations,
	},
	{
		commonResponses: {
			404: AxcelerateError,
			422: AxcelerateError,
		},
	},
);

export type AppContract = typeof contract;
