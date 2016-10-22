'use strict';


var gulp = require('gulp');
var plumber = require('gulp-plumber');
<% if (markupLanguage === 'pug') { %>var pug = require('gulp-pug');<% } %>
var browserSync = require('browser-sync');


var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('main:markup', function() {

  return gulp.src('<%= paths.src.markup %>/*.<%=markupLanguage%>')
    .pipe(plumber({
      errorHandler: onError
    }))
    <% if (markupLanguage === 'pug') { %>
    .pipe(pug({
      pretty: true
    }))
    <% } %>
    .pipe(gulp.dest('<%= paths.dist.markup %>'))
    .pipe(browserSync.reload({stream:true}));
});
