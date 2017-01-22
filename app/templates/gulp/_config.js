'use strict'

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
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap/scss',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'./node_modules/foundation-sites/scss',<% } %>
      <% if(frontEndFramework == 'basscss'){ %>'./node_modules/basscss-sass/scss',<% } %>
    ],
    scriptFiles: [
      <% if(jQuery){ %>'./node_modules/jquery/dist/jquery.min.js',<% } %>
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap/dist/js/bootstrap.min.js',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'./node_modules/foundation-sites/dist/js/foundation.min.js',<% } %>
      '<%= paths.src.scripts %>/vendor/*.js'
    ],
    fontFiles: [
      '<%= paths.src.fonts %>/**/*'
    ]
  }
}
