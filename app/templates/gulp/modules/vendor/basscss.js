'use strict'


var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');


var rename = require('gulp-rename');

var onError = function(err) {
    console.log(err);
}


gulp.task('vendor:basscss', function() {
  return gulp.src('assets/src/vendor/basscss-sass/basscss.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/dist/css'));
});
