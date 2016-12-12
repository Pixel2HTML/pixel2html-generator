'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

gulp.task('watch', function() {

  //static files
  <% if(markupIntegration=='jekyll'){ %>gulp.watch('<%= paths.src.markup %>/**/*.html', ['jekyll:rebuild']);<% } else { %>gulp.watch('<%= paths.src.markup %>/**/*.<%=markupLanguage%>', ['main:markup']);<% } %>

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

});
