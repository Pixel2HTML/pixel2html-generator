const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./config')
const {cwd} = require('process')

const production = config.production
const debug = config.debug
const WebpackMonitor = require('webpack-monitor')

// When you really want to make the relationship work...
const ENTRY_PATH = cwd() + '/' + config.project.jsMainFile
const OUTPUT_PATH = cwd() + '/' + config.directories.dist.scripts

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new WebpackMonitor({
    target: cwd() + '/gulp/stats.json'
  })
]
const productionPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify('production') }
  }),
  new UglifyJSPlugin({sourceMap: true})
]
const debugPlugins = [
  new BundleAnalyzerPlugin(),
  new WebpackMonitor({
    target: cwd() + '/gulp/stats.json',
    launch: true,
    port: 5000
  })
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
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['timmy']
        }
      }
    }]},
  output: {
    filename: production ? '[name].min.js' : '[name].js',
    path: OUTPUT_PATH
  },
  plugins
}

module.exports = CONFIG
