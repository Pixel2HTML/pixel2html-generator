const gulp = require('gulp')
const config = require('../config')
const webpack = require('webpack')
const wp = require('webpack-stream')
const webpackConfig = require('../webpack.config')

gulp.task('scripts', () =>
  gulp.src(config.project.jsMainFile)
    .pipe(wp(webpackConfig, webpack)).on('error', config.onError)
    .pipe(gulp.dest(config.directories.dist.scripts))
)
