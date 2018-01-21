const webpack = require('webpack')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const path = require('path')

const devPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new WatchMissingNodeModulesPlugin(path.resolve('node_modules'))
]

module.exports = devPlugins
