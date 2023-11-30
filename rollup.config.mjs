import nodeResolve from "@rollup/plugin-node-resolve"

export default {
	input: {
		"async": "auto.src/async.mjs",
		"sync": "auto.src/sync.mjs",
		"index": "auto.src/index.mjs"
	},

	output: {
		dir: "dist/",
		entryFileNames: "[name].cjs",
		format: "cjs"
	},

	plugins: [nodeResolve()]
};
