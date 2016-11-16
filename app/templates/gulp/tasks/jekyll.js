'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var helpers = require('../helpers');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;


gulp.task('jekyll:build', function (gulpCallBack){
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});
    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function () {
    browserSync.reload();
});
