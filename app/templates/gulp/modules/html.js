'use strict'


var gulp = require('gulp');

var browserSync = require('browser-sync');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('main:html', function() {
  return gulp.src('**/*.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.base %>'))
    .pipe(browserSync.reload({stream:true}))
});
