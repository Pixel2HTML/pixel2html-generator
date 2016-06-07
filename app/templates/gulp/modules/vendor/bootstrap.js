'use strict';


var gulp = require('gulp');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var cssnano = require('gulp-cssnano');

var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var browserSync = require('browser-sync');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('vendor:bootstrap:styles', function() {

  return gulp.src('<%= paths.src.frontendframework %>/bootstrap/index.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['<%= paths.src.vendors %>/bootstrap-sass/assets/stylesheets']
    }))
    .pipe(rename('bootstrap.css'))
    .pipe(autoprefixer('last 2 version', 'iOS 8'))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('vendor:bootstrap:fonts', function() {
  return gulp.src('<%= paths.src.vendors %>/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest('<%= paths.dist.fonts %>'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:bootstrap:scripts', function() {

  var bootstrapJsModules = [
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/button.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
    '<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
  ];


  return gulp.src(bootstrapJsModules)
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
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:bootstrap', ['vendor:bootstrap:styles',
  'vendor:bootstrap:scripts',
  'vendor:bootstrap:fonts'
]);
