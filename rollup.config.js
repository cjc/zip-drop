import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';


export default [{
  input: 'index.js',
  output: {
    file: pkg.module,
    format: 'esm'
  },
  plugins: [resolve()]
},{
  input: 'index.js',
  output: {
    file: pkg.browser,
	format: 'umd'
  },
  plugins: [resolve()]
}];
