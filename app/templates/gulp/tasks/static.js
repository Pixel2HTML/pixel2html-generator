'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

var del         = require('del');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');

gulp.task('clean', function(cb) {
  del(['<%= paths.dist.base %>'], cb);
});

gulp.task('main:images', function() {
  return gulp.src('<%= paths.src.images %>/**/*')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.images))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('main:icons', function() {
  return gulp.src('<%= paths.src.icons %>/**/*')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(gulp.dest(config.directories.dist.icons))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('main:static', ['main:images', 'main:icons']);
