import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	target: "node18",
	platform: "node",
	treeshake: true,
	splitting: false, // single-file outputs
	outDir: "dist",
	outExtension({ format }) {
		// proper Node-friendly extensions
		return { js: format === "esm" ? ".mjs" : ".cjs" };
	},
});
