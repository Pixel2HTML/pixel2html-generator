'use strict'
// We use this to read flags in the command line
const argv = require('yargs').argv
// Add your conditions here 💅
const production = argv.prod || argv.production

module.exports = {
  directories: {
    dist: {
      base: 'dist',
      markup: 'dist',
      fonts: 'dist/assets/fonts',
      icons: 'dist/assets/icons',
      images: 'dist/assets/images',
      scripts: 'dist/assets/js',
      styles: 'dist/assets/css',
    }
  },
  scriptFiles: [
    '<%= paths.src.scripts %>/*.js'
  ],
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
      '<%= paths.src.scripts %>/vendor/*.js'
    ],
    fontFiles: [
      '<%= paths.src.fonts %>/**/*',
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap-sass/assets/fonts/**/*',<% } %>
    ]
  },
  onError: function (error) {
    console.log(error.toString())
    this.emit('end')
  },
  production: production ? true : false,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.html', './dist/**/*.js'],
}
