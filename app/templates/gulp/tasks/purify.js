const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

gulp.task('purify', () =>
  gulp.src(config.directories.dist.styles + '*.css')
    .pipe($.purifycss(config.purify, { info: true }))
    .pipe(gulp.dest(config.directories.dist.styles))
)
