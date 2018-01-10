const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

gulp.task('minifyStyles', () =>
  gulp.src(config.directories.dist.styles + '/*.css')
    .pipe($.rename({suffix: '.min'}))
    .pipe($.csscomb())
    .pipe($.groupCssMediaQueries())
    .pipe($.cssnano())
    .pipe(gulp.dest(config.directories.dist.styles))
)
