var gulp = require('gulp')
var config = require('../config')

gulp.task('fonts', function () {
  return gulp.src(config.project.fontFiles)
    .pipe(gulp.dest(config.directories.dist.fonts))
})
