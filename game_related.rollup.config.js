


import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';


/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/lib/search_algo/game_related.ts',
  output: [
    {
      // dir: "dist",
      file: 'dist/game-related.js',
      format: 'module',
    }, {
      file: 'dist/game-related.min.js',
      format: "esm",
      plugins: [ terser() ]
    }
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: false,
      include: [ 'src/lib/search_algo/game_related.ts' ],
      compilerOptions: {
        lib: ["es5", "es6", "dom"],
        target: "es5"
      }
    }),
    babel({ babelHelpers: 'bundled' })
  ]
};

export default config;