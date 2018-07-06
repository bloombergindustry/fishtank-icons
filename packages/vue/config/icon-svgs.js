import { resolve } from "path";
import fs, { readdirSync, readFileSync } from "fs";
import { kebabCase, upperFirst, camelCase } from "lodash";

export default (iconsPath) => {
  return readdirSync(iconsPath).map(fileName => {
    const fullPath = resolve(iconsPath, fileName)
    const outputName = kebabCase(fileName.replace(/\.svg$/g, ''))
    return {
      fullPath,
      id: outputName,
      exportName: upperFirst(camelCase(outputName)),
      path: fileName,
    }
  })
}