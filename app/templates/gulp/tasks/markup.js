'use strict'
const gulp    = require('gulp')
const config  = require('../config')
const helpers = require('../helpers')

const $ = require('gulp-load-plugins')()
const when = require('gulp-if')

<% if (markupLanguage === 'pug') { %>
var pug         = require('gulp-pug')
<% } %>

gulp.task('main:markup', function() {
  return gulp.src('<%= paths.src.markup %>/*.<%=markupLanguage%>')
<% if (markupLanguage === 'pug') { %>
    .pipe(pug({ pretty: true }))
<% } %>
    .pipe(gulp.dest(config.directories.dist.markup))
})
