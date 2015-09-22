'use strict'

var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');

gulp.task('clean', function(cb) {
  del(['<%= paths.dist.base %>'], cb);
});

gulp.task('images:main', function() {
  return gulp.src('<%= paths.src.images %>/**/*')
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('<%= paths.dist.images %>'));
});

gulp.task('fonts:main', function() {
  return gulp.src('<%= paths.src.fonts %>/**/*')
    .pipe(gulp.dest('<%= paths.dist.fonts %>'));
});

gulp.task('icons:main', function() {
  return gulp.src('<%= paths.src.icons %>/**/*')
    .pipe(gulp.dest('<%= paths.dist.icons %>'));
});

gulp.task('static', ['images:main', 'fonts:main']);
