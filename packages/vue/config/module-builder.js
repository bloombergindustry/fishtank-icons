import { createFilter } from 'rollup-pluginutils'
import loadSvgFiles from './icon-svgs'

/*
 * This is a custom rollup plugin which will replace the contents of `src/index.js` with
 * an es6 file which is automatically generated from all svg icons in the top level
 * dist folder.  This will then get processed further down the chain by the rest of
 * the rollup config.
 */
export default function(opts = {}) {
  const svgFiles = loadSvgFiles(opts.iconsPath)

  let include = /src\/index\.js$/
  const entryPointFilter = createFilter(include, opts.exclude)

  return {
    name: 'fishtank-icons-generator',
    transform(code, id) {
      if (!entryPointFilter(id)) return;

      return svgFiles.map((file) => {
        return `export { default as ${file.exportName} } from "${file.fullPath}"`
      }).join('\n')
    }
  }
}