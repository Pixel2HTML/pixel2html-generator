'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('main:scripts', function() {
  return gulp.src('<%= paths.src.scripts %>/main.js')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:scripts', function() {
  return gulp.src(config.vendor.scriptFiles)
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.directories.dist.scripts))
    .pipe(browserSync.reload({stream:true}));
});
