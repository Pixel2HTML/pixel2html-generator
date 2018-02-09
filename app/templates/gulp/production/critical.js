const gulp = require('gulp')
const config = require('../config')
const critical = require('@pixel2html/pipes').critical

const markup = config.directories.dist.markup

gulp.task('critical', () =>
  gulp.src(config.directories.dist.markup + '/*.html')
    .pipe(critical({
      base: markup + '/',
      inline: true,
      timeout: 120000
    })())
    .on('error', config.onError)
    .pipe(gulp.dest(markup))
)
