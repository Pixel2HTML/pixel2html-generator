'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');

gulp.task('default', [
  'main:markup',
  'main:static',
  'main:styles',
  'main:scripts',
  <% if(frontEndFramework){ %>
  'vendor:styles',
  'vendor:fonts',
  <% } %>
  <% if(jQuery || frontEndFramework){ %>
  'vendor:scripts',
  <% } %>
]);
