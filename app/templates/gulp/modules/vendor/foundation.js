'use strict'


var gulp = require('gulp');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var browserSync = require('browser-sync');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('vendor:foundation:styles', function() {

  return gulp.src('<%= paths.src.frontendframework %>/foundation/index.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['<%= paths.src.vendors %>/foundation/scss']
    }))
    .pipe(rename('foundation.css'))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('vendor:foundation:fonts', function() {});

gulp.task('vendor:foundation:scripts', function() {

  var foundationJs = [
    '<%= paths.src.vendors %>/foundation/js/foundation.js',
    '<%= paths.src.vendors %>/foundation/js/foundation.min.js'
  ];


  return gulp.src(foundationJs)
    .pipe(plumber())
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(browserSync.reload({stream:true}))

});

gulp.task('vendor:foundation', ['vendor:foundation:styles',
  'vendor:foundation:fonts',
  'vendor:foundation:scripts'
])
