import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [typescript(), nodeResolve()],
    external: ["react"],
  },
  {
    input: "src/validators/index.ts",
    output: [
      {
        file: 'dist/validators/index.js',
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [typescript(), nodeResolve()],
		external: ["react"],
  },
];
