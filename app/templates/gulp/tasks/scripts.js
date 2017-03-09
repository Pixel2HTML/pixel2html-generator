'use strict'

const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

const production = config.production
const destination = config.directories.dist.scripts

gulp.task('main:scripts', () => {
  return gulp.src(config.scriptFiles)
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.concat('main.js'))
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(destination))
  // All production stuff here
  // Rename file to .min and uglify that stuff
  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.uglify({
    preserveComments: 'license'
  }))).on('error', config.errorHandler)
  .pipe(when(production, gulp.dest(destination)))
})

gulp.task('vendor:scripts', () => {
  return gulp.src(config.vendor.scriptFiles)
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.concat('vendor.js'))
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(destination))
  // All production stuff here
  // Rename file to .min and uglify that stuff
  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.uglify({
    preserveComments: 'license'
  }))).on('error', config.errorHandler)
  .pipe(when(production, gulp.dest(destination)))
})
