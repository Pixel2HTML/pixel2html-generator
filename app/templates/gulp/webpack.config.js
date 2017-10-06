const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./config')
const {cwd} = require('process')

const production = process.env.NODE_ENV === 'production'
const debug = process.env.NODE_ENV === 'debug'

// When you really want to make the relationship work...
const ENTRY_PATH = cwd() + '/' + config.project.jsMainFile
const OUTPUT_PATH = cwd() + '/' + config.directories.dist.scripts

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource)
  })
]
const productionPlugins = [
  new UglifyJSPlugin({sourceMap: true}),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify('production') }
  })
]
const debugPlugins = [
  new BundleAnalyzerPlugin()
]

if (production) plugins = [...plugins, ...productionPlugins]
if (debug) plugins = [...plugins, ...debugPlugins]

const CONFIG = {
  entry: ENTRY_PATH,
  devtool: production ? 'source-map' : 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]},
  output: {
    filename: production ? '[name].min.js' : '[name].js',
    path: OUTPUT_PATH
  },
  plugins
}

module.exports = CONFIG
