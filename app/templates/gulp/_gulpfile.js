var requireDir = require('require-dir')
var gulp    = require('gulp')

// Add all the tasks and files, boom!
requireDir('<%= paths.src.gulp %>', {
  recurse: true
})

gulp.task('build', gulp.series(
  'clean',
  'images',
  'scripts',
  'fonts',
  <% if(markupIntegration=='jekyll'){ -%>
  'jekyll',
  <% } else { -%>
  'markup',
  <% } -%>
  'styles'
))

gulp.task('serve', gulp.parallel('browser-sync', 'watch'))
gulp.task('release', gulp.series('build', 'zip'))
gulp.task('default', gulp.series('build', 'serve'))
