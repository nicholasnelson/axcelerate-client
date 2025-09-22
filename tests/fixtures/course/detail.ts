import type { z } from "zod";

import { GetCourseDetail } from "@schemas/course/detail";

export const courseDetailResponse = {
	OUTLINE: "A sample outline",
	CODE: "COURSE-1",
	COST: 250,
	GST_TYPE: 1,
	NAME: "Workshop Fundamentals",
	ID: 101,
	TYPE: "w",
	DESCRIPTION: "Overview of the workshop",
	LASTUPDATEDUTC: "2024-01-10 09:00",
	DURATION: "4 hours",
	OUTLINEELEMENTS: {
		CONTENT: ["Intro", "Practice"],
		SHORTDESCRIPTION: "Learn the basics",
		INTRODUCTION: "Welcome to the course",
		IMAGES: [],
		TARGETAUDIENCE: "All",
		ADDITIONALINFORMATION: "Bring your laptop",
		LEARNINGMETHODS: "Hands-on",
		LEARNINGOUTCOMES: ["Confidence"],
		PROGRAMBENEFITS: ["Skill growth"],
	},
} satisfies z.input<(typeof GetCourseDetail.responses)[200]>;
