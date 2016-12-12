'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

<% if (cssProcessor === 'scss' || frontEndFramework) { %>var sass = require('gulp-sass');<% } %><% if (cssProcessor === 'less') { %>var less = require('gulp-less');<% } %><% if (cssProcessor === 'styl') { %>var stylus = require('gulp-stylus');<% } %>

var groupcssmediaqueries = require('gulp-group-css-media-queries');
var minify = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');


gulp.task('main:styles', function() {
  return gulp.src('<%= cssMainFile %>')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(sourcemaps.init())
    <% if (cssProcessor === 'scss') { %>.pipe(sass())<% } %><% if (cssProcessor === 'less') { %>.pipe(less())<% } %><% if (cssProcessor === 'styl') { %>.pipe(stylus())<% } %>
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 8'],
      cascade: false
    }))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(groupcssmediaqueries({ log: true }))
    .pipe(minify({ keepSpecialComments: 0 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:styles', function() {
  return gulp.src('<%= cssVendorFile %>')
    .pipe(plumber({ errorHandler: helpers.onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: config.vendor.scssDirectories
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 8'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(groupcssmediaqueries({ log: true }))
    .pipe(minify({ keepSpecialComments: 0 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(browserSync.reload({stream:true}));
});
