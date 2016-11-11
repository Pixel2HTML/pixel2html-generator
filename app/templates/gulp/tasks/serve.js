'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: './dist'
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('serve', ['default', 'watch', 'browser-sync']);
