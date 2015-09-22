'use strict'

var gulp = require('gulp');



gulp.task('watch', function() {

  //static files
  gulp.watch("**/*.html", ['html:main']);
  gulp.watch("<%= paths.src.images %>/**/*", ['images:main']);
  gulp.watch("<%= paths.src.fonts %>/**/*", ['fonts:main']);
  gulp.watch("<%= paths.src.icons %>/**/*", ['icons:main']);

  //scripts
  gulp.watch("<%= paths.src.scripts %>/**/*.js", ['scripts:main']);

});
