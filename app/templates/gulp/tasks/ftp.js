const gulp = require('gulp')
const config = require('../config')
const ftp = require('vinyl-ftp')

gulp.task('ftp', () => {
  const conn = ftp.create({
    host: config.deploy.ftp.host,
    user: config.deploy.ftp.user,
    password: config.deploy.ftp.password,
    parallel: 5
  })
  return gulp.src(config.directories.dist.base + '/**/*', {
    buffer: false
  })
  .pipe(conn.dest(config.deploy.ftp.remotePath))
})

gulp.task('deploy', gulp.series('ftp'))
