'use strict';


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var zip  = require('gulp-zip');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('build:zip', function() {

  var distFiles = [
    '*.html',
    '!index.html',
    'assets/dist/**/*',
    <% if (cssProcessor === 'scss') { %>
    'assets/src/styles/**/*',
    <% } %>
  ];

  return gulp.src(distFiles, {base: '.'})
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(zip('latest.zip'))
    .pipe(gulp.dest('<%= paths.releases.base %>'));
});


gulp.task('build', ['default', 'build:zip']);
