'use strict'


var gulp = require('gulp');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('html:main', function() {
  return gulp.src('**/*.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('<%= paths.dist.base %>'));
});
