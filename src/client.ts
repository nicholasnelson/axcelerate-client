import { Http } from "./util/http";
import {
	Courses,
	CourseDetail,
	CourseInstances,
	CourseEnrol,
} from "./resources";

export interface ClientOptions {
	apiToken: string;
	wsToken: string;
	baseUrl?: string;
	fetchImpl?: typeof fetch;
}

export class AxcelerateClient {
	private readonly http: Http;
	readonly courses: Courses;
	readonly courseDetail: CourseDetail;
	readonly courseInstances: CourseInstances;
	readonly courseEnrol: CourseEnrol;

	constructor(opts: ClientOptions) {
		if (!opts.apiToken || !opts.wsToken)
			throw new Error("apiToken and wsToken are required");
		this.http = new Http({
			baseUrl: opts.baseUrl ?? "https://api.axcelerate.com/v2/",
			headers: { apitoken: opts.apiToken, wstoken: opts.wsToken },
			fetchImpl: opts.fetchImpl,
		});

		this.courses = new Courses(this.http);
		this.courseDetail = new CourseDetail(this.http);
		this.courseInstances = new CourseInstances(this.http);
		this.courseEnrol = new CourseEnrol(this.http);
	}
}
