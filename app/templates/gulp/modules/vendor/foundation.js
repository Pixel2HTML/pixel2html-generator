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

var onError = function(err) {
  console.log(err);
}


gulp.task('vendor:foundation:styles', function() {

  return gulp.src('<%= paths.src.frontendframework %>/foundation/index.scss')

  .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(rename('foundation.css'))
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['<%= paths.src.vendors %>/foundation/scss/foundation']
    }))



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


gulp.task('vendor:foundation:scripts', function() {

  var foundationJsModules = [
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.abide.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.accordion.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.alert.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.clearing.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.dropdown.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.equalizer.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.interchange.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.joyride.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.magellan.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.offcanvas.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.orbit.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.reveal.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.slider.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.tab.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.tooltip.js',
    '<%= paths.src.vendors %>/foundation/js/foundation/foundation.topbar.js',
  ];


  return gulp.src(foundationJsModules)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('foundation.js'))
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

gulp.task('vendor:foundation', ['vendor:foundation:styles',
  'vendor:foundation:scripts'
])
