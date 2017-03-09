'use strict'
const gulp    = require('gulp')
const config  = require('../config')
const when = require('gulp-if')
const $ = require('gulp-load-plugins')()
const destination = config.directories.dist.styles
const production = config.production

gulp.task('main:styles', function() {
  return gulp.src('<%= cssMainFile %>')
    .pipe($.sourcemaps.init())
    .pipe(when(!production, $.sourcemaps.init()))
    <% if (cssProcessor === 'scss') { %>
        .pipe($.sass({
          includePaths: config.vendor.scssDirectories
        }))
        .on('error', $.sass.logError)
    <% } %>
    <% if (cssProcessor === 'less') { %>
        .pipe($.less())
        .on('error', config.onError)
    <% } %>
    <% if (cssProcessor === 'styl') { %>
        .pipe($.stylus())
        .on('error', config.onError)
    <% } %>
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'iOS 8']
    }))
    .pipe(gulp.dest('<%= paths.dist.styles %>'))
    .pipe($.groupCssMediaQueries())
    .pipe($.csscomb())
    .pipe(when(!production, $.sourcemaps.write('./')))
    .pipe(gulp.dest(destination))

    .pipe(when(production, $.rename({suffix: '.min'})))
    .pipe(when(production, $.purifycss( config.purify, { info: true } )))
    .pipe(when(production, $.cssnano()))
    .pipe(when(production, gulp.dest(destination)))
})


gulp.task('vendor:styles', () => {
  return gulp.src('<%= cssVendorFile %>')
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.sass({
    includePaths: config.vendor.scssDirectories
  }))
  .on('error', $.sass.logError)
  .pipe($.autoprefixer({
    browsers: ['last 2 versions', 'iOS 8']
  }))
  .pipe($.groupCssMediaQueries())
  .pipe($.csscomb())
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(destination))

  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.purifycss( config.purify, { info: true } )))
  .pipe(when(production, $.cssnano()))
  .pipe(when(production, gulp.dest(destination)))
})
