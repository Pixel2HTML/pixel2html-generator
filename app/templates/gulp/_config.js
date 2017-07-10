'use strict'
// We use this to read flags in the command line
const argv = require('yargs').argv
// Add your conditions here 💅
const production = argv.prod || argv.production

module.exports = {
  directories: {
    src: {
      base: '<%= paths.src.base %>',
      <% if(markupLanguage == 'html'){%>markup: '<%= paths.src.markup %>',<% } %>
      <% if(markupLanguage == 'pug'){%>markup: '<%= paths.src.markup %>/pug',<% } %>
      fonts: '<%= paths.src.fonts %>',
      icons: '<%= paths.src.icons %>',
      images: '<%= paths.src.images %>',
      scripts: '<%= paths.src.scripts %>',
      styles: '<%= paths.src.styles %>'
    },
    dist: {
      base: '<%= paths.dist.base %>',
      markup: '<%= paths.dist.markup %>',
      fonts: 'dist/assets/fonts',
      icons: 'dist/assets/icons',
      images: 'dist/assets/images',
      scripts: 'dist/assets/js',
      styles: 'dist/assets/css',
    }
  },
  project: {
    cssMainFile: '<%= cssMainFile %>',
    scriptFiles: [
      '<%= paths.src.scripts %>/*.js'
    ],
    fontFiles: [
      '<%= paths.src.fonts %>/**/*',
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap-sass/assets/fonts/**/*',<% } %>
    ]
  },
  vendor: {
    scssDirectories: [
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap-sass/assets/stylesheets',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'./node_modules/foundation-sites/scss',<% } %>
      <% if(frontEndFramework == 'basscss'){ %>'./node_modules/basscss-sass/scss',<% } %>
    ],
    scriptFiles: [
      <% if(jQuery){ %>'./node_modules/jquery/dist/jquery.min.js',<% } %>
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'./node_modules/foundation-sites/dist/js/foundation.min.js',<% } %>
      './node_modules/svg4everybody/dist/svg4everybody.min.js',
      '<%= paths.src.scripts %>/vendor/*.js'
    ]
  },
  onError: function (error) {
    console.log(error.toString())
    this.emit('end')
  },
  production: !!production,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.js', './dist/**/*.html'],
}
