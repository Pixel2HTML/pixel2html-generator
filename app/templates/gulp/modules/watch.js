'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {

  //static files
  gulp.watch('<%= paths.src.html %>/*.html', ['main:html']);
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


  <% if (frontEndFramework) { %>
  gulp.watch('<%= paths.src.frontendframework %>/**/**.scss', ['vendor:<%=frontEndFramework%>:styles']);
  gulp.watch('<%= paths.src.frontendframework %>/**/**.js', ['vendor:<%=frontEndFramework%>:scripts']);
  gulp.watch('<%= paths.src.frontendframework %>/**/fonts/**/*', ['vendor:<%=frontEndFramework%>:fonts']);
  <% } %>


});
