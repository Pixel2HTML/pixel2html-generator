const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const productionPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin({sourceMap: true}),
  new WorkboxPlugin({
    globDirectory: 'dist',
    globPatterns: [
      // Cache everything except sourceMaps
      '**/!(*.map)'
    ],
    swDest: path.join('dist', 'sw.js'),
    clientsClaim: true,
    skipWaiting: true
  })
]

module.exports = productionPlugins
