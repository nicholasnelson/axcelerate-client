import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	target: "node20",
	minify: false,
	treeshake: true,
	splitting: false, // keep single-file outputs
});
