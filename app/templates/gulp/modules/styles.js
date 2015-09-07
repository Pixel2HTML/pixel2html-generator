'use strict'


var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify');
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var onError = function(err) {
    console.log(err);
}


gulp.task('styles:main', function() {
  return gulp.src('<%= cssMainFile %>')
    .pipe(plumber({ errorHandler: onError }))

    <% if (cssProcessor === 'sass') { -%>
    .pipe(sass())
    <% } -%>
    <% if (cssProcessor === 'less') { -%>
    .pipe(less())
    <% } -%>
    <% if (cssProcessor === 'stylus') { -%>
    .pipe(stylus())
    <% } -%>
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({keepSpecialComments:0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('<%= paths.dist.styles %>'));
});
