import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import os from 'os';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: {
    file: 'dist/printer-status-card.js',
    format: 'esm',
    name: 'PrinterStatusCard',
    inlineDynamicImports: true,
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      include: ['**/*.ts'],
      cacheRoot: path.join(os.tmpdir(), '.rpt2_cache_3d_printer_status_card'),
      tsconfigOverride: {
        compilerOptions: {
          noEmit: false,
          declaration: false,
        },
      },
    }),
    json(),
    terser(),
  ],
  onwarn(warning, handler) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    handler(warning);
  },
};
