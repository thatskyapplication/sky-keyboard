import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["source/index.ts", "manifest.json"],
	loader: { ".json": "copy" },
	platform: "browser",
	format: "esm",
	target: "chrome139",
	skipNodeModulesBundle: true,
	clean: true,
	keepNames: true,
	minify: true,
	sourcemap: false,
	outDir: "distribution",
});
