'use strict';

var gulp = require('gulp');

var plumber = require('gulp-plumber');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('vendor:jquery:scripts', function() {

  return gulp.src('<%= paths.src.vendors %>/jquery/dist/jquery.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('<%= paths.dist.scripts %>'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('vendor:jquery', ['vendor:jquery:scripts']);
