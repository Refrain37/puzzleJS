/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

if (!process.env.pkgName) {
    throw new Error('current package must be specified via --environment flag.');
}

/* package config */
const isProduction = process.env.NODE_ENV === 'production';
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.pkgName);
const concat = p => path.resolve(packageDir, p);

/* plugin configs */
const extensions = ['.ts', '.js', '.less', '.css'];

const rollupConfig = [{
    input: concat('src/index.ts'),
    output: {
        file: concat('dist/index.esm.js'),
        format: 'esm',
        exports: 'named',
        sourcemap: !isProduction,
    },
    plugins: [
        resolve({ extensions }),
        esbuild({
            tsconfig: 'tsconfig.json',
            loaders: {
                '.json': 'json',
            },
        }),
    ],
}, ];

export default rollupConfig;