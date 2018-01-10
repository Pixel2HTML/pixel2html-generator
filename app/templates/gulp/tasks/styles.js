const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const moduleImporter = require('sass-module-importer')
const postCssPlugins = require('./postCssPlugins')
const fs = require('fs-path')

gulp.task('main:styles', () =>
  gulp.src(config.project.cssFiles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', config.onError)
    .pipe($.postcss(postCssPlugins.plugins))
    .pipe($.concat('main.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.directories.dist.styles))
)

gulp.task('writeModules', done => {
  const json = postCssPlugins.getJSON()
  fs.writeFileSync(config.directories.src.cssModules, json)
  done()
})

gulp.task('vendor:styles', () =>
  gulp.src(config.project.cssVendorFile)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', config.onError)
    .pipe($.postcss([
      require('autoprefixer')({browsers: config.browsers})
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.directories.dist.styles))
)

gulp.task('styles', gulp.series('main:styles', 'vendor:styles', 'writeModules'))
