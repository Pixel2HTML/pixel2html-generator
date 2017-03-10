'use strict'
var gulp = require('gulp')
var config = require('../config')

gulp.task('main:fonts', function () {
  return gulp.src(config.project.fontFiles)
    .pipe(gulp.dest(config.directories.dist.fonts))
})

gulp.task('vendor:fonts', function () {
  return gulp.src(config.vendor.fontFiles)
    .pipe(gulp.dest(config.directories.dist.fonts))
})
