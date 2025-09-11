import { AxcelerateClient } from "../AxcelerateClient";
import { AxcelerateResource } from "../AxcelerateResource";

type EndpointCtor<T extends AxcelerateResource = AxcelerateResource> = new (
	...args: ConstructorParameters<typeof AxcelerateResource>
) => T;

type RegistryItem<T extends AxcelerateResource = AxcelerateResource> = {
	path: string[];
	ctor: EndpointCtor<T>;
};

const registry: RegistryItem[] = [];

export function endpoint(path: string) {
	const parts = path.split("/").filter(Boolean);
	return <T extends AxcelerateResource>(value: EndpointCtor<T>) => {
		registry.push({ path: parts, ctor: value });
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ensureChild(obj: any, key: string) {
	if (obj[key] === undefined) {
		Object.defineProperty(obj, key, {
			value: Object.create(null),
			enumerable: true,
			configurable: false,
			writable: false, // prevents reassignment, but child object stays extensible
		});
	}
	return obj[key];
}

export function mountEndpoints(target: AxcelerateClient) {
	for (const { path, ctor } of registry) {
		let node = target;
		for (let i = 0; i < path.length; i++) {
			const seg = path[i];
			const isLeaf = i === path.length - 1;
			if (isLeaf) {
				// attach the endpoint instance at the leaf segment
				Object.defineProperty(node, seg, {
					value: new ctor(target),
					enumerable: true,
					configurable: false,
					writable: false,
				});
			} else {
				// walk or create namespace object OR reuse existing endpoint instance as a namespace
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if ((node as any)[seg] === undefined) {
					node = ensureChild(node, seg);
				} else {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					node = (node as any)[seg];
				}
			}
		}
	}
}
