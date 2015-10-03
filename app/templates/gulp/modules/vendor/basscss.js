'use strict'


var gulp = require('gulp');

var sass = require('gulp-sass');

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var onError = function(err) {
  console.log(err);
}


gulp.task('vendor:basscss:styles', function() {

  return gulp.src('<%= paths.src.frontendframework %>/basscss/index.scss')

  .pipe(plumber({
    errorHandler: onError
  }))

  .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['<%= paths.src.vendors %>/basscss-sass']
    }))
    .pipe(rename('basscss.css'))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      suffix: '.min'
    }))


  .pipe(gulp.dest('<%= paths.dist.styles %>'));
});


gulp.task('vendor:basscss', ['vendor:basscss:styles'])
