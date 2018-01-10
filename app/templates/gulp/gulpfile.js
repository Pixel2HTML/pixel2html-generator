const config = require('./gulp/config')
const requireDir = require('require-dir')
const gulp = require('gulp')

requireDir('./gulp/tasks', {recurse: true})

let tasks = [
  'clean',
  'styles',
  'images',
  'scripts',
  'fonts',
  <% if(markupIntegration === 'jekyll'){ -%>
  'jekyll'
  <% } else if (markupLanguage === 'pug') { %>
  'markup'
  <% } else { -%>
  'markup',
  'icons',
  <% }  -%>
]

if (config.production) {
  tasks.push(
    'minifyStyles',
    'purify',
    'critical'
  )
}

gulp.task('build', gulp.series(...tasks))
gulp.task('serve', gulp.parallel('browser-sync', 'watch'))
gulp.task('release', gulp.series('build', 'zip'))
gulp.task('default', gulp.series('build', 'serve'))
