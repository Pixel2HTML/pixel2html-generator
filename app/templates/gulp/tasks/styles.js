const gulp    = require('gulp')
const config  = require('../config')
const when = require('gulp-if')
const $ = require('gulp-load-plugins')()
const production = config.production
const moduleImporter = require('sass-module-importer')

gulp.task('main:styles', function() {
  return gulp.src(config.project.cssMainFile)
    .pipe(when(!production, $.sourcemaps.init()))
    <% if (cssProcessor === 'scss') { -%>
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', $.sass.logError)
    <% } -%>
    <% if (cssProcessor === 'less') { -%>
    .pipe($.less()).on('error', config.onError)
    <% } %>
    <% if (cssProcessor === 'styl') { -%>
    .pipe($.stylus()).on('error', config.onError)
    <% } -%>
    .pipe($.autoprefixer())
    .pipe(when(production, $.groupCssMediaQueries()))
    .pipe(when(production, $.csscomb()))
    .pipe(when(!production, $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.directories.dist.styles))

    .pipe(when(production, $.rename({suffix: '.min'})))
    .pipe(when(production, $.purifycss( config.purify, { info: true } )))
    .pipe(when(production, $.cssnano()))
    .pipe(when(production, gulp.dest(config.directories.dist.styles)))
})

gulp.task('vendor:styles', () => {
  return gulp.src(config.project.cssVendorFile)
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.sass({importer: moduleImporter()}))
  .on('error', $.sass.logError)
  .pipe($.autoprefixer())
  .pipe(when(production, $.groupCssMediaQueries()))
  .pipe(when(production, $.csscomb()))
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(config.directories.dist.styles))

  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.purifycss( config.purify, { info: true } )))
  .pipe(when(production, $.cssnano()))
  .pipe(when(production, gulp.dest(config.directories.dist.styles)))
})

gulp.task('styles', gulp.parallel('main:styles', 'vendor:styles'))
