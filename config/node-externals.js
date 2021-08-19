const fs = require('fs')
const path = require('path')

const res = p => path.resolve(__dirname, p)
const nodeModules = res('../node_modules')
const externals = fs
  .readdirSync(nodeModules)
  // .filter(x => !/\.bin|loadable\/component/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})
externals['react-dom/server'] = 'commonjs react-dom/server'
externals['@loadable/component'] = 'commonjs @loadable/component'

module.exports = externals
