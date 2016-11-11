'use strict';


var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

var concat  = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify  = require('gulp-uglify');

var browserSync = require('browser-sync');

gulp.task('main:scripts', function() {
  return gulp.src('<%= paths.src.scripts %>/main.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(browserSync.reload({stream:true}));
});
