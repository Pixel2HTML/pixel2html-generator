'use strict';
var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

var plumber     = require('gulp-plumber');
<% if (markupLanguage === 'pug') { %>
var pug         = require('gulp-pug');
<% } %>

gulp.task('main:markup', function() {
  return gulp.src('<%= paths.src.markup %>/*.<%=markupLanguage%>')
    .pipe(plumber({ errorHandler: helpers.onError }))
<% if (markupLanguage === 'pug') { %>
    .pipe(pug({ pretty: true }))
<% } %>
    .pipe(gulp.dest(config.directories.dist.markup))
});
