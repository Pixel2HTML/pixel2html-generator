'use strict'

module.exports = {
  directories: {
    'dist': {
      'base': 'dist',
      'markup': 'dist',
      'fonts': 'dist/assets/fonts',
      'icons': 'dist/assets/icons',
      'images': 'dist/assets/images',
      'scripts': 'dist/assets/js',
      'styles': 'dist/assets/css',
    }
  },
  vendor: {
    scssDirectories: [
      <% if(frontEndFramework == 'bootstrap'){ %>'<%= paths.src.vendors %>/bootstrap-sass/assets/stylesheets',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'<%= paths.src.vendors %>/foundation-sites/scss',<% } %>
      <% if(frontEndFramework == 'basscss'){ %>'<%= paths.src.vendors %>/basscss-sass/scss',<% } %>
    ],
    scriptFiles: [
      <% if(jQuery){ %>'<%= paths.src.vendors %>/jquery/dist/jquery.js',<% } %>
      <% if(frontEndFramework == 'bootstrap'){ %>'<%= paths.src.vendors %>/bootstrap-sass/assets/javascripts/bootstrap.js',<% } %>
      <% if(frontEndFramework == 'foundation'){ %>'<%= paths.src.vendors %>/foundation-sites/dist/foundation.js',<% } %>
    ],
    fontFiles: [
      <% if(frontEndFramework == 'bootstrap'){ %>'<%= paths.src.vendors %>/bootstrap-sass/assets/fonts/bootstrap/**/*',<% } %>
    ]
  }
}
