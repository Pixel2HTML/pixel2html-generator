'use strict';


var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var jshint = require('gulp-jshint');

var browserSync = require('browser-sync');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('main:scripts', function() {
  return gulp.src('<%= paths.src.scripts %>/main.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(browserSync.reload({stream:true}));
});
