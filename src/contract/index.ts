import { initContract } from "@ts-rest/core";

import { courses } from "./courses";
import { contacts } from "./contacts";
import { AxcelerateError } from "../schemas";

const c = initContract();

export const contract = c.router(
	{
		courses,
		contacts,
	},
	{
		commonResponses: {
			404: AxcelerateError,
			422: AxcelerateError,
		},
	},
);
