'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

gulp.task('default', [
  'main:static',
  'main:fonts',
  'main:styles',
  'main:scripts',
  <% if(markupIntegration=='jekyll'){ %>
  'jekyll:build',
  <% } else { %>
  'main:markup',
  <% } %>
  'vendor:styles',
  'vendor:fonts',
  'vendor:scripts',
]);
