import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';


export default [
{
  input: 'index.js',
  output: {
    file: 'dist/zip-drop.esm-flat.js',
    format: 'esm'
  },
  plugins: [resolve()]
},{
  input: 'browser.js',
  output: {
    file: pkg.browser,
	format: 'umd'
  },
  plugins: [resolve()]
}];
