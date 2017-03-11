'use strict'

var gulp = require('gulp')
var config = require('../config')
var $ = require('gulp-load-plugins')()

var del = require('del')

gulp.task('clean', function () {
  return del([config.directories.dist.base])
})

gulp.task('main:images', function () {
  return gulp.src(config.directories.src.images + '/**/*')
    .pipe(gulp.dest(config.directories.dist.images))
})

gulp.task('main:icons', function () {
  return gulp.src(config.directories.src.icons + '/**/*.svg')
    .pipe($.svgmin({
      plugins: [
        {
          removeStyleElement: true
        },
        {
          removeAttrs: {
            attrs: ['fill', 'stroke', 'fill.*', 'stroke.*']
          }
        }
      ],
      js2svg: { pretty: true }
    }))
    .pipe($.svgstore())
    .pipe($.rename('symbols.svg'))
    .pipe(gulp.dest(config.directories.dist.icons))
})

gulp.task('main:static', gulp.series('main:images', 'main:icons'))
