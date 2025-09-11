/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
	"src/resources/**/*.{ts,tsx}": [
		"npm run generate",
		"git add -A src/resources/_all.ts src/types/endpoints.d.ts",
	],
	"*.{js,mjs,cjs,ts,mts,cts}": ["eslint --cache --fix", "prettier --write"],
};
