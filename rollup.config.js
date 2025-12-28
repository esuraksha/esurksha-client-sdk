import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import fs from 'fs'

const pkg = JSON.parse(
  fs.readFileSync('./package.json', 'utf-8')
)

export default {
  input: 'src/index.js',
  output: {
    file: `dist/esurksha-${pkg.version}.min.js`,
    format: 'iife',        
    name: 'ESurksha',       
    sourcemap: true
  },
  plugins: [
    resolve(),
    terser()
  ]
}
