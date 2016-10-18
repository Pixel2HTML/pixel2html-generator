'use strict';


var gulp = require('gulp');

var sass = require('gulp-sass');

var minify = require('gulp-clean-css');

var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var browserSync = require('browser-sync');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

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
    .pipe(autoprefixer('last 2 version', 'iOS 8'))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:basscss:fonts', function() {});
gulp.task('vendor:basscss:scripts', function() {});


gulp.task('vendor:basscss', ['vendor:basscss:styles', 'vendor:basscss:scripts', 'vendor:basscss:fonts'])
