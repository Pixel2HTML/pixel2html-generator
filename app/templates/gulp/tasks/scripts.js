const gulp = require('gulp')
const config = require('../config')
const production = config.production
const debug = config.debug
const webpack = require('webpack')
const wp = require('webpack-stream')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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

gulp.task('scripts', () => {
  return gulp.src(config.project.jsMainFile)
    .pipe(wp({
      devtool: production ? 'source-map' : 'inline-source-map',
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        }]},
      output: {
        filename: production ? '[name].min.js' : '[name].js'
      },
      plugins
    }, webpack)).on('error', config.onError)
    .pipe(gulp.dest(config.directories.dist.scripts))
})
