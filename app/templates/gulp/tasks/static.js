const gulp = require('gulp')
const config = require('../config')
const del = require('del')

gulp.task('clean', () =>
  del([config.directories.dist.base])
)

gulp.task('images', () =>
  gulp.src(config.directories.src.images + '/**/*')
    .pipe(gulp.dest(config.directories.dist.images))
)

<% if(markupLanguage === 'html' || markupIntegration === 'jekyll'){ -%>
gulp.task('icons', () =>
  gulp.src(config.directories.src.icons + '/**/*')
    .pipe(gulp.dest(config.directories.dist.icons))
)
<% } -%>
