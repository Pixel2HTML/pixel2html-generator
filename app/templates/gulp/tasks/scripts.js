'use strict'

const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const when = require('gulp-if')

const production = config.production
const destination = config.directories.dist.scripts

gulp.task('main:scripts', () => {
  return gulp.src(config.project.scriptFiles)
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.concat('main.js'))
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(destination))
  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.uglify())).on('error', config.onError)
  .pipe(when(production, gulp.dest(destination)))
})

gulp.task('vendor:scripts', () => {
  return gulp.src(config.vendor.scriptFiles)
  .pipe(when(!production, $.sourcemaps.init()))
  .pipe($.concat('vendor.js'))
  .pipe(when(!production, $.sourcemaps.write('./')))
  .pipe(gulp.dest(destination))
  .pipe(when(production, $.rename({suffix: '.min'})))
  .pipe(when(production, $.uglify())).on('error', config.onError)
  .pipe(when(production, gulp.dest(destination)))
})
