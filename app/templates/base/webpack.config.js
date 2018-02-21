const config = require('./gulp/config')
const paths = require('./webpack/paths')

const commonPlugins = require('./webpack/commonPlugins')
const devPlugins = require('./webpack/developmentPlugins')
const productionPlugins = require('./webpack/productionPlugins')

const production = config.production
const debug = config.debug

let debugPlugins = []

if (debug) {
  debugPlugins = require('./webpack/debugPlugins')
}

let plugins = [ ...commonPlugins ]

const shouldBeDebugMode = production || debug

if (!shouldBeDebugMode) plugins = [...plugins, ...devPlugins]
if (shouldBeDebugMode) plugins = [...plugins, ...productionPlugins]
if (debug) plugins = [...plugins, ...debugPlugins]

process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

if (shouldBeDebugMode) {
  process.env.NODE_ENV = 'production'
  process.env.BABEL_ENV = 'production'
}

module.exports = {
  entry: paths.entry,
  devtool: shouldBeDebugMode ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [require.resolve('@pixel2html/eslint-config')]
              },
              ignore: false,
              useEslintrc: false
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.src
      },
      {
        test: /\.(js|jsx|mjs)$/,
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
      }
    ]},
  output: {
    filename: shouldBeDebugMode ? '[name].min.js' : '[name].js',
    chunkFilename: shouldBeDebugMode ? '[name].chunk.min.js' : '[name].chunk.js',
    path: paths.output,
    publicPath: '/'
  },
  plugins,
  externals: shouldBeDebugMode ? {
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
  bail: shouldBeDebugMode
}
