'use strict'


var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var jshint = require('gulp-jshint');

var onError = function(err) {
  console.log(err);
}

gulp.task('scripts:main', function() {
  return gulp.src('<%= paths.src.scripts %>/main.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('<%= paths.dist.scripts %>'));
});
