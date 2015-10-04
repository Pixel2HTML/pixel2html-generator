'use strict'

var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('clean', function(cb) {
  del(['<%= paths.dist.base %>'], cb);
});

gulp.task('images:main', function() {
  return gulp.src('<%= paths.src.images %>/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('<%= paths.dist.images %>'));
});

gulp.task('fonts:main', function() {
  return gulp.src('<%= paths.src.fonts %>/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.fonts %>'));
});

gulp.task('icons:main', function() {
  return gulp.src('<%= paths.src.icons %>/**/*')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.icons %>'));
});

gulp.task('static', ['images:main', 'fonts:main', 'icons:main']);
