import { resolve } from 'path'
import filesize from "rollup-plugin-filesize"
import externals from '@yelo/rollup-node-external'
import babel from "rollup-plugin-babel"
import moduleBuilder from './config/module-builder'
import vueSvgComponent from 'rollup-plugin-vue-svg-component'

const builds = {
  esm: {
    entry: 'src/index.js',
    dest: `lib-esm/icons.js`,
    format: "es",
  },
  cjs: {
    entry: 'src/index.js',
    dest: `lib/icons.js`,
    format: "cjs",
  },
}

function genConfig(name) {
  const opts = builds[name]

  const config = {
    input: opts.entry,
    external: externals(),
    plugins: [
      moduleBuilder({
        iconsPath: resolve(__dirname, '../../dist/')
      }),
      vueSvgComponent(),
      babel({
        exclude: "node_modules/**",
      }),
      filesize()
    ],
    output: {
      file: opts.dest,
      format: opts.format,
    },
  }

  Object.defineProperty(config, "_name", {
    enumerable: false,
    value: name
  })

  return config
}

const target = process.env.TARGET || "esm"
export default genConfig(target);
