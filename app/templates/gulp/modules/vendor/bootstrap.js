'use strict'


var gulp = require('gulp');

<% if (cssProcessor === 'scss') { -%>
var sass = require('gulp-sass');
<% } -%>
<% if (cssProcessor === 'less') { -%>
var less = require('gulp-less');
<% } -%>
<% if (cssProcessor === 'styl') { -%>
var stylus = require('gulp-stylus');
<% } -%>

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var onError = function(err) {
    console.log(err);
}


gulp.task('vendor:bootstrap:styles', function() {

<% if (cssProcessor === 'scss') { -%>
var mainFile = 'assets/src/vendor/bootstrap-sass/assets/stylesheets/_boostrap.scss';
<% } -%>
<% if (cssProcessor === 'less') { -%>
var mainFile = 'assets/src/less/vendor/bootstrap/bootstrap.less';
<% } -%>
<% if (cssProcessor === 'styl') { -%>
var mainFile = 'assets/src/vendor/bootstrap-stylus/bootstrap/index.styl';
<% } -%>

  return gulp.src(mainFile)

    .pipe(plumber({ errorHandler: onError }))
    <% if (cssProcessor === 'scss') { -%>
    .pipe(sass())
    <% } -%>
    <% if (cssProcessor === 'less') { -%>
    .pipe(less())
    <% } -%>
    <% if (cssProcessor === 'styl') { -%>
    .pipe(stylus())
    <% } -%>
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/dist/css'));
});



gulp.task('vendor:bootstrap:scripts', function() {
  //TODO
});

gulp.task('vendor:boostrap', ['vendor:bootstrap:styles', 'vendor:bootstrap:scripts'])




