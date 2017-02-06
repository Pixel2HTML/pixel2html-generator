'use strict'
var gulp = require('gulp')
var helpers = require('../helpers')
var plumber = require('gulp-plumber')
var zip = require('gulp-zip')

gulp.task('zip', function () {
  var distFiles = [
    'dist/*.html',
    'dist/assets/**/*'
  ]

  return gulp.src(distFiles, {base: '.'})
    .pipe(plumber({
      errorHandler: helpers.onError
    }))
    .pipe(zip('latest.zip'))
    .pipe(gulp.dest('<%= paths.releases.base %>'))
})

