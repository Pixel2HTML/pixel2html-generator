'use strict'
const gulp    = require('gulp')
const config  = require('../config')
const $ = require('gulp-load-plugins')()
const when = require('gulp-if')
const production = config.production

<% if (markupLanguage === 'pug') { %>
// Hey don't touch these unless you know what you're doing
// with Love Mike ❤️
const devLocals = {
  base: '',
  extension: '',
  productionMode: false
}
const prodLocals = {
  base: '/<%= clientId %>/<%= projectId %>',
  extension: '.html',
  productionMode: true
}
<% } %>

gulp.task('main:markup', function() {
<% if (markupLanguage === 'pug') { %>
  return gulp.src('<%= paths.src.markup %>/pug/*.<%=markupLanguage%>')
    .pipe(when(!production, $.pug({
      pretty: true,
      baseDir: './<%= paths.src.markup %>/pug',
      locals: devLocals
    }))).on('error', config.onError)
    .pipe(when(production, $.pug({
      baseDir: './<%= paths.src.markup %>/pug',
      locals: prodLocals
    }))).on('error', config.onError)

<% } else { %>
  return gulp.src('<%= paths.src.markup %>/*.<%=markupLanguage%>')
    .pipe(gulp.dest(config.directories.dist.markup))
<% } %>
    .pipe(gulp.dest(config.directories.dist.markup))
})
