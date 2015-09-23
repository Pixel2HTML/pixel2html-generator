'use strict'


var gulp = require('gulp');

<% if (cssProcessor === 'scss') { %>
var sass = require('gulp-sass');
<% } %>
<% if (cssProcessor === 'less') { %>
var less = require('gulp-less');
<% } %>
<% if (cssProcessor === 'styl') { %>
var stylus = require('gulp-stylus');
<% } %>

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var onError = function(err) {
  console.log(err);
}


gulp.task('vendor:basscss:styles', function() {

  return gulp.src('assets/src/<%= cssProcessor %>/vendor/basscss/index.<%= cssProcessor %>')

  .pipe(plumber({
    errorHandler: onError
  }))
  <% if (cssProcessor === 'scss') { %>
  .pipe(sass({
    style: 'compressed',
    loadPath: ['<%= paths.src.vendors %>/basscss-sass']
  }))
  <% } %>
  <% if (cssProcessor === 'less') { %>
  .pipe(less())
    .pipe(rename('basscss.css'))
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      suffix: '.min'
    }))
  <% } %>
  <% if (cssProcessor === 'styl') { %>
  .pipe(stylus())
  <% } %>


  .pipe(gulp.dest('assets/dist/css'));
});



gulp.task('vendor:basscss:fonts', function() {
  //TODO
});

gulp.task('vendor:basscss:scripts', function() {
  //TODO
});

gulp.task('vendor:basscss', ['vendor:basscss:styles',
  'vendor:basscss:scripts',
  'vendor:basscss:fonts'
])
