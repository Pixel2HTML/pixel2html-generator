const gulp = require('gulp')
const config = require('../config')
const browserSync = require('browser-sync')
const openBrowser = require('react-dev-utils/openBrowser')
const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const {prepareUrls, choosePort} = WebpackDevServerUtils
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

gulp.task('browser-sync', done => {
  const DEFAULT_PORT = 3000
  const HOST = '0.0.0.0'
  const protocol = 'http'
  const bundler = webpack(webpackConfig)
  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port === null) return
      const urls = prepareUrls(protocol, HOST, port)
      browserSync.init({
        port,
        server: {
          baseDir: config.directories.dist.base,
          serveStaticOptions: {
            extensions: ['html']
          }
        },
        open: false,
        logConnections: true,
        tunnel: config.tunnel,
        logPrefix: 'Pixel2Html',
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: { colors: true }
          }),
          webpackHotMiddleware(bundler)
        ],
        files: [
          '**/*.css'
        ]
      })
      openBrowser(urls.localUrlForBrowser)
      done()
    })
})
