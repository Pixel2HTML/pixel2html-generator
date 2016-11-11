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
  'vendor:<%= frontEndFramework %>',
  <% } %>
  <% if(jQuery){ %>
  'vendor:jquery',
  <% } %>
]);
