'use strict'

module.exports = {

  vendor: {
    sassDirectories: [
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
