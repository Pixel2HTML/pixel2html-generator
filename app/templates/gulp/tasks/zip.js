'use strict'
var gulp = require('gulp')
var config = require('../config')
var zip = require('gulp-zip')

gulp.task('zip', function () {
  var distFiles = [
    `${config.directories.dist.base}/**`,
    `!${config.directories.dist.base}`
  ]

  return gulp.src(distFiles, {base: '.'})
    .pipe(zip('latest.zip')).on('error', config.onError)
    .pipe(gulp.dest('<%= paths.releases.base %>'))
})
