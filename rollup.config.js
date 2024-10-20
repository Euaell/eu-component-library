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
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            url(),
            image(),
            postcss({
                extract: true,
                plugins: [tailwindcss(), autoprefixer()],
            }),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: packageJson.types, format: 'esm' }],
        plugins: [dts()],
    },
]
