import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "esm",
			exports: "named",
			sourcemap: true,
			strict: false,
		},
	],
	plugins: [typescript(), nodeResolve()],
	external: ["react"],
};
