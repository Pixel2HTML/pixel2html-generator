const gulp = require('gulp')
const spawn = require('child_process').spawn

gulp.task('jekyll', function (gulpCallBack) {
  var jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
  jekyll.on('exit', function (code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code)
  })
})
