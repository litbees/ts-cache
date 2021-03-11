import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'build/esm5/index.js',
  output: [
    {
      name: 'TsCache',
      format: 'umd',
      file: 'build/bundles/ts-cache.umd.js',
      sourcemap: true,
    },
    {
      name: 'TsCache',
      format: 'umd',
      file: 'build/bundles/ts-cache.umd.min.js',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [commonjs(), nodeResolve()],
};
