'use strict'

module.exports = {

  vendor: {
    sassDirectories: [
      <% if(frontEndFramework == 'bootstrap'){ %>
      'src/assets/vendor/bootstrap-sass/assets/stylesheets',
      <% } %>
    ],
    scriptsFiles: [
      <% if(frontEndFramework == 'bootstrap'){ %>
      'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap.js',
      <% } %>
    ],
    fontsFiles: [
      <% if(frontEndFramework == 'bootstrap'){ %>
      'src/assets/vendor/bootstrap-sass/assets/fonts/bootstrap/**/*',
      <% } %>

    ],
    images: [

    ],
    icons: [

    ]
  }
}
