const gulp = require('gulp')
const { spawn } = require('child_process')
const config = require('../config')

// Epic hax to have Jekyll read from the ENV
// thanks node docs!
const { env } = require('process')
env.JEKYLL_ENV = config.production ? 'production' : 'development'

gulp.task('jekyll', function (gulpCallBack) {
  var jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {
    stdio: 'inherit',
    env
  })
  jekyll.on('exit', function (code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code)
  })
})
