// src/resources/_registry.ts
import { AxcelerateClient } from "../AxcelerateClient";
import { AxcelerateResource } from "../AxcelerateResource";

type EndpointCtor<T extends AxcelerateResource = AxcelerateResource> = new (
	...args: ConstructorParameters<typeof AxcelerateResource>
) => T;

const registry: { path: string[]; ctor: EndpointCtor }[] = [];

export function endpoint(path: string) {
	const parts = path.split("/").filter(Boolean);
	return <T extends AxcelerateResource>(value: EndpointCtor<T>) => {
		registry.push({ path: parts, ctor: value });
	};
}

export function mountEndpoints(client: AxcelerateClient) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let node: any, key: string;
	for (const { path, ctor } of registry) {
		node = client;
		for (let i = 0; i < path.length; i++) {
			key = path[i];
			node[key] ||= Object.create(null);
			if (i === path.length - 1)
				Object.setPrototypeOf(node[key], new ctor(client));
			node = node[key];
		}
	}
}
