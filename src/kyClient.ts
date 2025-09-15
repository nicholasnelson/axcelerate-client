import ky from "ky";

export const createKyClient = () =>
	ky.create({
		timeout: 10_000,
		retry: { limit: 3, methods: ["get", "put", "post", "patch", "delete"] },
		hooks: {
			beforeRequest: [
				// req => {
				//   // auth header, request id, etc.
				//   req.headers.set("authorization", `Bearer ${getToken()}`);
				// },
			],
			afterResponse: [
				// async (_req, _opts, res) => {
				//   // map vendor errors to a consistent shape if needed
				//   if (!res.ok) {
				//     // throw or transform here
				//   }
				// },
			],
		},
	});
