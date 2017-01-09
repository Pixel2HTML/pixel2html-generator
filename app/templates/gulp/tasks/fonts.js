'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');

gulp.task('main:fonts', function() {
  return gulp.src('<%= paths.src.fonts %>/**/*')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.fonts))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:fonts', function() {
  return gulp.src(config.vendor.fontFiles)
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.fonts))
    .pipe(browserSync.reload({stream:true}));
});
