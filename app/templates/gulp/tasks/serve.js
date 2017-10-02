const gulp = require('gulp')
const config = require('../config')
const browserSync = require('browser-sync')

function reload (done) {
  browserSync.reload()
  done()
}

gulp.task('browser-sync', done => {
  browserSync.init({
    server: {
      baseDir: config.directories.dist.base,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    open: false,
    logConnections: true,
    logPrefix: 'Pixel2Html'
  })
  done()
})

gulp.task('watch', done => {
  gulp.watch(config.directories.src.markup + '/**/*.pug', gulp.series('main:markup', reload))
  gulp.watch(config.directories.src.icons + '/**/*', gulp.series('main:markup', reload))
  gulp.watch(config.directories.src.images + '/**/*', gulp.series('images', reload))
  gulp.watch(config.project.fontFiles, gulp.series('main:fonts', reload))
  gulp.watch(config.directories.src.scripts + '/**/*.js', gulp.series('scripts', reload))
  gulp.watch(config.directories.src.styles + '/**/*.scss', gulp.series('styles', reload))
  done()
})

gulp.task('watch', done => {
  //static files
  <% if(markupIntegration === 'jekyll'){ %>
    gulp.watch(config.directories.src.markup+'/**/*.html', gulp.series('jekyll:rebuild', reload))
    gulp.watch(config.directories.src.icons+'/**/*.svg', gulp.series( 'icons', reload ))
  <% } else if (markupLanguage === 'pug') { %>
    gulp.watch(config.directories.src.markup+'/**/*.<%=markupLanguage%>', gulp.series( 'markup', reload ))
    gulp.watch(config.directories.src.icons+'/**/*.svg', gulp.series( 'markup', reload ))
  <% } else { %>
    gulp.watch(config.directories.src.markup+'/**/*.<%=markupLanguage%>', gulp.series( 'markup', reload ))
    gulp.watch(config.directories.src.icons+'/**/*.svg', gulp.series( 'icons', reload ))
  <% } %>

  gulp.watch(config.directories.src.images+'/**/*', gulp.series( 'images', reload ))
  gulp.watch(config.project.fontFiles, gulp.series( 'main:fonts', reload ))

  //scripts
  gulp.watch(config.directories.src.scripts+'/**/*.js', gulp.series( 'scripts', reload ))

  //styles
  gulp.watch([
    config.directories.src.styles+'/**/*.<%=cssProcessor%>',
    '!<%= paths.src.frontendframework %>/**/*',
  ], gulp.series( 'main:styles', reload ))

  gulp.watch([
    config.directories.src.styles + '/vendor.scss'
  ], gulp.series( 'vendor:styles', reload ))

  done()
})

<% if(markupIntegration=='jekyll'){ -%>
gulp.task('jekyll:rebuild', gulp.series('jekyll', reload))
<% } %>
