'use strict'

var gulp = require('gulp')
var config = require('../config')
var helpers = require('../helpers')

var del = require('del')
var plumber = require('gulp-plumber')

gulp.task('clean', function () {
  return del(['<%= paths.dist.base %>'])
})

gulp.task('main:images', function () {
  return gulp.src('<%= paths.src.images %>/**/*')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.images))
})

gulp.task('main:icons', function () {
  return gulp.src('<%= paths.src.icons %>/**/*')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.icons))
})

gulp.task('main:static', gulp.series( 'main:images', 'main:icons' ))
