'use strict'
const gulp    = require('gulp')
const config  = require('../config')
const $ = require('gulp-load-plugins')()
const when = require('gulp-if')
const production = config.production

gulp.task('main:markup', function() {
<% if (markupLanguage === 'pug') { %>
  return gulp.src('<%= paths.src.markup %>/pug/*.<%=markupLanguage%>')

    .pipe(when(!production, $.pug({
      pretty: true,
      baseDir: './<%= paths.src.markup %>/pug'
    }))).on('error', config.errorHandler)
    .pipe(when(production, $.pug({
      baseDir: './<%= paths.src.markup %>/pug'
    }))).on('error', config.errorHandler)

<% } else { %>
  return gulp.src('<%= paths.src.markup %>/*.<%=markupLanguage%>')
    .pipe(gulp.dest(config.directories.dist.markup))
<% } %>
    .pipe(gulp.dest(config.directories.dist.markup))
})
