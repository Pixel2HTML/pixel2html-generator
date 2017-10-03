const gulp    = require('gulp')
const config  = require('../config')
const $ = require('gulp-load-plugins')()
const production = config.production
<% if (markupLanguage === 'pug') { -%>
const fs = require('fs')
<% } -%>

<% if (markupLanguage === 'html') { -%>
const JS_DIR = config.directories.dist.scripts
const CSS_DIR = config.directories.dist.styles

const JS_EXT = production ? '.min.js' : '.js'
const CSS_EXT = production ? '.min.css' : '.css'

const js = [
  `${JS_DIR}/vendor${JS_EXT}`,
  `${JS_DIR}/main${JS_EXT}`
]

const css = [
  `${CSS_DIR}/vendor${CSS_EXT}`,
  `${CSS_DIR}/main${CSS_EXT}`
]
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
<% if (markupLanguage === 'html') { -%>
    .pipe($.htmlReplace({ js, css }))
<% } -%>
    .pipe(gulp.dest(config.directories.dist.markup))
})
