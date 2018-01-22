const config = require('./gulp/config')
const paths = require('./webpack/paths')

const commonPlugins = require('./webpack/commonPlugins')
const devPlugins = require('./webpack/developmentPlugins')
const productionPlugins = require('./webpack/productionPlugins')
const debugPlugins = require('./webpack/debugPlugins')

const production = config.production
const debug = config.debug

let plugins = [ ...commonPlugins ]

if (!production) plugins = [...plugins, ...devPlugins]
if (production) plugins = [...plugins, ...productionPlugins]
if (debug) plugins = [...plugins, ...debugPlugins]

module.exports = {
  entry: production ? {
    main: paths.entry
  } : {
    main: [
      require.resolve('webpack-hot-middleware/client') + '?/',
      require.resolve('webpack/hot/dev-server'),
      paths.entry
    ]
  },
  devtool: production ? 'source-map' : 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      include: paths.src,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('@pixel2html/babel-preset')
          ],
          cacheDirectory: true
        }
      }
    }]},
  output: {
    filename: production ? '[name].min.js' : '[name].js',
    chunkFilename: production ? '[name].chunk.min.js' : '[name].chunk.js',
    path: paths.output,
    publicPath: '/'
  },
  plugins,
  externals: production ? {
    jquery: 'jQuery'
  } : {},
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  resolve: {
    alias: {
      styles: paths.styles
    }
  },
  bail: !!production
}
