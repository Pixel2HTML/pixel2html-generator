const gulp    = require('gulp')
const config  = require('../config')
<% if (markupLanguage === 'pug') { -%>
const $ = require('gulp-load-plugins')()
const fs = require('fs')
const production = config.production
<% } -%>

gulp.task('markup', function() {
  return gulp.src(config.directories.src.markup+'/*.<%=markupLanguage%>')
<% if (markupLanguage === 'pug') { -%>
    .pipe($.pug({
      baseDir: config.directories.src.markup,
      locals: {
        icon: name => fs.readFileSync(`./src/assets/icons/${name}.svg`),
        production
      }
    })).on('error', config.onError)
    .pipe($.htmlPrettify())
<% } -%>
    .pipe(gulp.dest(config.directories.dist.markup))
})
