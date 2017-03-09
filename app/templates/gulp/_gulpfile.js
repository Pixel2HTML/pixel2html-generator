'use strict'

var requireDir = require('require-dir')
var gulp    = require('gulp')
var config  = require('./src/assets/gulp/config')
var browserSync = require('browser-sync')


// Add all the tasks and files, boom!
requireDir('<%= paths.src.gulp %>', {
  recurse: true
})

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('main:static',
    'main:styles',
    'main:scripts',
    'main:fonts',
    <% if(markupIntegration=='jekyll'){ %>
    'jekyll:build'
    <% } else { %>
    'main:markup'
    <% } %>),
  gulp.parallel('vendor:styles',
  'vendor:scripts')
))


function reload(done) {
  browserSync.reload()
  done()
}

gulp.task('browser-sync', () => {
  return browserSync.init({
    server : {
      baseDir : config.directories.dist.base,
      serveStaticOptions : {
        extensions : ['html']
      }
    },
    open : false,
    logConnections : true
  })
})

gulp.task('watch', done => {
  // Detect changes on the config file
  gulp.watch('<%= paths.src.gulp %>/config.js', gulp.series('default', reload))

  //static files
  <% if(markupIntegration=='jekyll'){ %>
      gulp.watch('<%= paths.src.markup %>/**/*.html', gulp.series('jekyll:rebuild', reload))
    <% } else { %>
      gulp.watch('<%= paths.src.markup %>/**/*.<%=markupLanguage%>', gulp.series( 'main:markup', reload ))
  <% } %>

  gulp.watch('<%= paths.src.images %>/**/*', gulp.series( 'main:images', reload ))
  gulp.watch('<%= paths.src.fonts %>/**/*', gulp.series( 'main:fonts', reload ))
  gulp.watch('<%= paths.src.icons %>/**/*', gulp.series( 'main:icons', reload ))

  //scripts
  gulp.watch('<%= paths.src.scripts %>/**/*.js', gulp.series( 'main:scripts', reload ))

  //styles
  gulp.watch([
    '<%= paths.src.styles %>/**/*.<%=cssProcessor%>',
    '!<%= paths.src.frontendframework %>/**/*',
  ], gulp.series( 'main:styles', reload ))

  done()
})

gulp.task('serve', gulp.parallel('browser-sync', 'watch'))

gulp.task('release', gulp.series('build', 'zip'))

gulp.task('default', gulp.series('build', 'serve'))
