'use strict'


var gulp = require('gulp');

<% if (cssProcessor === 'scss') { %>
var sass = require('gulp-ruby-sass');
<% } %>
<% if (cssProcessor === 'less') { %>
var less = require('gulp-less');
<% } %>
<% if (cssProcessor === 'styl') { %>
var stylus = require('gulp-stylus');
<% } %>

var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var onError = function(err) {
    console.log(err);
}

gulp.task('styles:main', function() {
  return gulp.src('<%= cssMainFile %>')
    .pipe(plumber({ errorHandler: onError }))

    <% if (cssProcessor === 'scss') { %>
    .pipe(sass())
    <% } %>
    <% if (cssProcessor === 'less') { %>
    .pipe(less())
    <% } %>
    <% if (cssProcessor === 'styl') { %>
    .pipe(stylus())
    <% } %>
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.init())
    .pipe(minify({keepSpecialComments:0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('<%= paths.dist.styles %>'));
});
