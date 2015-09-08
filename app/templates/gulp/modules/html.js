'use strict'


var gulp = require('gulp');

var typeset = require('typeset');

var onError = function(err) {
    console.log(err);
}

gulp.task('html:main', function() {
  return gulp.src('**/*.html')
    .pipe(gulp.dest('<%= paths.dist.base %>'));
});
