const gulp = require('gulp')
const config = require('../config')
const critical = require('critical').stream

const markup = config.directories.dist.markup

gulp.task('critical', () =>
  gulp.src(config.directories.dist.markup + '/*.html')
    .pipe(critical({
      base: markup,
      inline: true,
      css: [
        'dist/assets/css/vendor.min.css',
        'dist/assets/css/main.min.css'
      ]
    }).on('error', config.onError))
    .pipe(gulp.dest(markup))
)
