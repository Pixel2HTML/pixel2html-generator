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
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var onError = function(err) {
    console.log(err);
}


gulp.task('vendor:bootstrap:styles', function() {

  return gulp.src('assets/src/<%= cssProcessor %>/vendor/bootstrap/bootstrap.<%= cssProcessor %>')

    .pipe(plumber({ errorHandler: onError }))
    <% if (cssProcessor === 'scss') { %>
      .pipe(sass({
        style: 'compressed',
        loadPath: ['<%= paths.src.vendors %>/bootstrap-sass/assets/stylesheets']
      }))
    <% } %>
    <% if (cssProcessor === 'less') { %>
    .pipe(less())
    .pipe(rename('bootstrap.css'))
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({suffix: '.min'}))
    <% } %>
    <% if (cssProcessor === 'styl') { %>
    .pipe(stylus())
    <% } %>


    .pipe(gulp.dest('assets/dist/css'));
});



gulp.task('vendor:bootstrap:fonts', function() {
  //TODO
});

gulp.task('vendor:bootstrap:scripts', function() {
  //TODO
});

gulp.task('vendor:bootstrap',
    [ 'vendor:bootstrap:styles',
      'vendor:bootstrap:scripts',
      'vendor:bootstrap:fonts' ]
)







