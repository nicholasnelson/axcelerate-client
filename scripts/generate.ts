import path from "node:path";
import { Project } from "ts-morph";
import { generateResourcesAll } from "./gen-resources-all";
import { generateEndpointsDts } from "./gen-endpoints-dts";

const ROOT = path.resolve(process.cwd(), "src");
const RES_DIR = path.join(ROOT, "resources");
const ALL_FILE = path.join(RES_DIR, "_all.ts");
const TYPES_DIR = path.join(ROOT, "types");
const ENDPOINTS_DTS = path.join(TYPES_DIR, "endpoints.d.ts");

async function main() {
	const project = new Project({
		tsConfigFilePath: path.resolve("tsconfig.json"),
		skipAddingFilesFromTsConfig: true,
		skipFileDependencyResolution: true,
		compilerOptions: { skipLibCheck: true },
	});

	await generateResourcesAll(project, {
		root: ROOT,
		resDir: RES_DIR,
		outFile: ALL_FILE,
	});

	// Ensure _all.ts is in the project before generating d.ts
	project.addSourceFileAtPath(ALL_FILE);

	await generateEndpointsDts(project, {
		root: ROOT,
		allFile: ALL_FILE,
		outDir: TYPES_DIR,
		outFile: ENDPOINTS_DTS,
	});
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
