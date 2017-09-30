const gulp    = require('gulp')
const config  = require('../config')
const $ = require('gulp-load-plugins')()
const when = require('gulp-if')
const production = config.production

<% if (markupLanguage === 'pug') { -%>
// Hey don't touch these unless you know what you're doing
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
<% } -%>

gulp.task('main:markup', function() {
  return gulp.src(config.directories.src.markup+'/*.<%=markupLanguage%>')
<% if (markupLanguage === 'pug') { -%>
    .pipe(when(!production, $.pug({
      baseDir: config.directories.src.markup,
      locals: devLocals
    }))).on('error', config.onError)
    .pipe(when(production, $.pug({
      baseDir: config.directories.src.markup,
      locals: prodLocals
    }))).on('error', config.onError)
    .pipe($.htmlPrettify())
<% } -%>
    .pipe(gulp.dest(config.directories.dist.markup))
})
