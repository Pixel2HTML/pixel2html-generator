'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');
var browserSync = require('browser-sync');



gulp.task('build', gulp.series(
  'main:static',
  'main:styles',
  'main:scripts',
  'vendor:styles',
  'vendor:fonts',
  'vendor:scripts',
  <% if(markupIntegration=='jekyll'){ %>
  'jekyll:build',
  <% } else { %>
  'main:markup',
  <% } %>
))

function reload(done) {
  browserSync.reload()
  done()
}

gulp.task('browser-sync', () => {
  return browserSync.init({
    server : {
      baseDir : config.directorie.dist.base,
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
      gulp.watch('<%= paths.src.markup %>/**/*.html', gulp.series('jekyll:rebuild', reload));
    <% } else { %>
      gulp.watch('<%= paths.src.markup %>/**/*.<%=markupLanguage%>', ['main:markup']);
  <% } %>

  gulp.watch('<%= paths.src.images %>/**/*', ['main:images']);
  gulp.watch('<%= paths.src.fonts %>/**/*', ['main:fonts']);
  gulp.watch('<%= paths.src.icons %>/**/*', ['main:icons']);

  //scripts
  gulp.watch('<%= paths.src.scripts %>/**/*.js', ['main:scripts']);

  //styles
  gulp.watch([
    '<%= paths.src.styles %>/**/*.<%=cssProcessor%>',
    '!<%= paths.src.frontendframework %>/**/*',
  ], ['main:styles']);

  <% if (frontEndFramework) { %>gulp.watch('<%= paths.src.frontendframework %>/**/**.scss', ['vendor:<%=frontEndFramework%>:styles']);
  gulp.watch('<%= paths.src.frontendframework %>/**/**.js', ['vendor:<%=frontEndFramework%>:scripts']);
  gulp.watch('<%= paths.src.frontendframework %>/**/fonts/**/*', ['vendor:<%=frontEndFramework%>:fonts']);<% } %>
  done()
})

gulp.task('serve', gulp.parallel('browserSync', , 'serve''watch'))

gulp.task('release', gulp.series('build', 'zip'))

gulp.task('default', gulp.series('build', 'serve'))
