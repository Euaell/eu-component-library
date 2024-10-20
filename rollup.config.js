// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import packageJson from './package.json' assert { type: 'json' };

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [
			// Place TypeScript plugin before resolve plugin
			typescript({ tsconfig: './tsconfig.json' }),
			// Configure resolve plugin to include .ts and .tsx
			resolve({
				extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node'],
			}),
			commonjs(),
			url(),
			image(),
			postcss({
				extract: 'index.css', // Output CSS file name
                plugins: [tailwindcss(), autoprefixer()],
                extensions: ['.css', '.scss'],
                minimize: true,
                sourceMap: true,
			}),
		],
		external: ['react', 'react-dom'],
		onwarn: (warning, warn) => {
			// Suppress circular dependency warnings from specific modules
			if (
				warning.code === 'CIRCULAR_DEPENDENCY' &&
				/node_modules\/d3-/.test(warning.importer)
			) {
				return;
			}
			warn(warning);
		},
	},
	{
		input: 'src/index.ts',  // Use source files for generating declarations
		output: [{ file: packageJson.types, format: 'esm' }],
		plugins: [dts()],
	},
]
