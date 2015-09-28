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
var sourcemaps = require('gulp-sourcemaps');

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var onError = function(err) {
  console.log(err);
}


gulp.task('vendor:bootstrap:styles', function() {

  return gulp.src('<%= paths.src.base %>/<%= cssProcessor %>/vendor/bootstrap/index.<%= cssProcessor %>')

  .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())

  <% if (cssProcessor === 'scss') { %>
  .pipe(sass({
    style: 'compressed',
    loadPath: ['<%= paths.src.vendors %>/bootstrap-sass/assets/stylesheets']
  }))
  <% } %>
  <% if (cssProcessor === 'less') { %>
  .pipe(less())
    .pipe(rename('bootstrap.css'))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
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

  .pipe(sourcemaps.write())

  .pipe(gulp.dest('<%= paths.dist.styles %>'));
});



gulp.task('vendor:bootstrap:fonts', function() {
  <% if (cssProcessor === 'scss') { %>
  var fontDirectory = '<%= paths.src.vendors %>/bootstrap-sass/assets/fonts/bootstrap/**/*';
  <% } %>
  <% if (cssProcessor === 'less') { %>
  var fontDirectory = '<%= paths.src.vendors %>/bootstrap/fonts/**/*';
  <% } %>
  <% if (cssProcessor === 'styl') { %>
  var fontDirectory = '<%= paths.src.vendors %>/bootstrap-stylus/fonts/**/*';
  <% } %>
  return gulp.src(fontDirectory)
    .pipe(gulp.dest('<%= paths.dist.fonts %>'));
});

gulp.task('vendor:bootstrap:scripts', function() {
  <% if (cssProcessor === 'scss') { %>
  var scriptsDirectory = '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/*.js';
  <% } %>
  <% if (cssProcessor === 'less') { %>
  var scriptsDirectory = '<%= paths.src.vendors %>/bootstrap/js/*.js';
  <% } %>
  <% if (cssProcessor === 'styl') { %>
  var scriptsDirectory = '<%= paths.src.vendors %>/bootstrap-stylus/js/*.js';
  <% } %>

  return gulp.src(scriptsDirectory)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('bootstrap.js'))
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())

  .pipe(gulp.dest('<%= paths.dist.scripts %>'));
});

gulp.task('vendor:bootstrap', ['vendor:bootstrap:styles',
  'vendor:bootstrap:scripts',
  'vendor:bootstrap:fonts'
])
