'use strict'
// We use this to read flags in the command line
const argv = require('yargs').argv
// Add your conditions here 💅
const production = !!argv.prod || !!argv.production
const debug = !!argv.debug

module.exports = {
  directories: {
    src: {
      base: '<%= paths.src.base %>',
      <% if(markupLanguage == 'html'){ -%>
      markup: '<%= paths.src.markup %>',
      <% } -%>
      <% if(markupLanguage == 'pug'){ -%>
      markup: '<%= paths.src.markup %>/pug',
      <% } -%>
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
    cssVendorFile: 'src/assets/styles/vendor.scss',
    jsMainFile: 'src/assets/js/main.js',
    fontFiles: [
      '<%= paths.src.fonts %>/**/*',
      <% if(frontEndFramework == 'bootstrap'){ %>'./node_modules/bootstrap-sass/assets/fonts/**/*',<% } %>
    ]
  },
  onError: error => {
    console.log(error.toString())
    this.emit('end')
  },
  production,
  debug,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.js', './dist/**/*.html'],
  deploy: {
    ftp: {
      user: '',
      password: '',
      host: '',
      port: '21',
      remotePath: './'
    }
  }
}
