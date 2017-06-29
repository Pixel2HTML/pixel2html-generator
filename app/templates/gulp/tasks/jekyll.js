'use strict'

var gulp = require('gulp')
var browserSync = require('browser-sync')
var spawn = require('child_process').spawn

gulp.task('jekyll:build', function (gulpCallBack) {
  var jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
  jekyll.on('exit', function (code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code)
  })
})

function reload(done) {
  browserSync.reload()
  done()
}


gulp.task('jekyll:rebuild', gulp.series( 'jekyll:build', reload ))
