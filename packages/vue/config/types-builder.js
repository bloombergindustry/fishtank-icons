import loadSvgFiles from './icon-svgs'
import { createFilter } from 'rollup-pluginutils'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const svgFiles = loadSvgFiles(resolve(__dirname, '../../../dist'))

const outputPath = resolve(__dirname, '../typings.d.ts')

let declarations = svgFiles.map((file) => {
  return `declare const ${file.exportName} : VueConstructor<Vue>`
})

let exportList = svgFiles.map((file) => {
  return `  ${file.exportName},`
})

let output = [
  `import Vue, { VueConstructor } from "vue"\n`,
  ...declarations,
  `\nexport {`,
  ...exportList,
  `}`
]
writeFileSync(outputPath, output.join('\n'))