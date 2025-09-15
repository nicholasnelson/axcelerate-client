import { describe, it, expect, afterAll } from "vitest";
import {
	assertPropEq,
	assertStatus,
	createDefaultAxcelerateClient,
	setupMockClient,
} from "./util";
import { getResponse } from "./fixtures/courses/get";
import { courseDetailResponse } from "./fixtures/courses/detail";
import { courseInstancesResponse } from "./fixtures/courses/instances";
import {
	enrolRequestBody,
	enrolResponse,
	enrolMultipleRequestBody,
	enrolMultipleResponse,
} from "./fixtures/courses/enrolments";

const { agent, client } = setupMockClient();

describe("course", () => {
	afterAll(() => {
		console.log(agent.getCallHistory());
		agent.clearCallHistory();
		client.cleanMocks();
	});

	it("list returns typed items", async () => {
		client
			.intercept({
				path: "/api/courses",
				method: "GET",
			})
			.reply(200, JSON.stringify(getResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().courses.getCourses();
		console.log(agent.getCallHistory());
		assertStatus(out, 200);
		expect(out.body).toHaveLength(getResponse.length);
		expect(out.body[0].name).toBe(getResponse[0].NAME);
		expect(out.body[0].gstType).toBe(getResponse[0].GST_TYPE);
	});

	it("returns transformed course detail", async () => {
		client
			.intercept({
				path: "/api/course/detail",
				method: "GET",
				query: { ID: courseDetailResponse.ID, type: courseDetailResponse.TYPE },
			})
			.reply(200, JSON.stringify(courseDetailResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().courses.getCourseDetail({
			query: { ID: courseDetailResponse.ID, type: courseDetailResponse.TYPE },
		});

		assertPropEq(out, "status", 200);
		assertPropEq(out.body, "type", "w");

		expect(out.body.id).toBe(courseDetailResponse.ID);
		expect(out.body.duration).toBe(courseDetailResponse.DURATION);
		expect(out.body.outlineElements?.content).toEqual(
			courseDetailResponse.OUTLINEELEMENTS.CONTENT,
		);
	});

	it("lists course instances", async () => {
		client
			.intercept({
				path: "/api/course/instances",
				method: "GET",
				query: {
					ID: courseInstancesResponse[0].ID,
					type: "w",
				},
			})
			.reply(200, JSON.stringify(courseInstancesResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out =
			await createDefaultAxcelerateClient().courses.getCourseInstances({
				query: {
					ID: courseInstancesResponse[0].ID,
					type: "w",
				},
			});

		assertStatus(out, 200);
		expect(out.body).toHaveLength(courseInstancesResponse.length);
		expect(out.body[0].instanceId).toBe(courseInstancesResponse[0].INSTANCEID);
	});

	it("transforms enrol response", async () => {
		client
			.intercept({
				path: "/api/course/enrol",
				method: "POST",
			})
			.reply(200, JSON.stringify(enrolResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().courses.enrol({
			body: enrolRequestBody,
		});

		assertStatus(out, 200);
		expect(out.body.invoiceId).toBe(enrolResponse.INVOICEID);
		expect(out.body.contactId).toBe(enrolResponse.CONTACTID);
	});

	it("transforms enrol multiple response", async () => {
		client
			.intercept({
				path: "/api/course/enrolMultiple",
				method: "POST",
			})
			.reply(200, JSON.stringify(enrolMultipleResponse), {
				headers: {
					"content-type": "application/json",
				},
			});

		const out = await createDefaultAxcelerateClient().courses.enrolMultiple({
			body: enrolMultipleRequestBody,
		});

		assertStatus(out, 200);
		expect(out.body).toHaveLength(enrolMultipleResponse.length);
		expect(out.body[1].learnerId).toBe(enrolMultipleResponse[1].LEARNERID);
	});
});
