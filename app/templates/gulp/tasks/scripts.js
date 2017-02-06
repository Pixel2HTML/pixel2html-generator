'use strict'

var gulp = require('gulp')
var config = require('../config')
var helpers = require('../helpers')

var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('main:scripts', function () {
  return gulp.src(config.scriptFiles)
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(concat('main.min.js'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.directories.dist.scripts))
})

gulp.task('vendor:scripts', function () {
  return gulp.src(config.vendor.scriptFiles)
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.directories.dist.scripts))
})
