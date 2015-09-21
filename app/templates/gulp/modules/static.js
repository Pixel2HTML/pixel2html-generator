'use strict'


var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');

gulp.task('clean', function(cb) {
  del(['<%= paths.dist.base %>'], cb);
});

gulp.task('static:images', function() {
  return gulp.src('<%= paths.src.images %>/**/*')
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('<%= paths.dist.images %>'));
});

gulp.task('static:fonts', function() {
  return gulp.src('<%= paths.src.fonts %>/**/*')
    .pipe(gulp.dest('<%= paths.dist.fonts %>'));
});


gulp.task('static', ['static:images', 'static:fonts']);
