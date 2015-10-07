'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('general', function() {

  before('crafting project', function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'test-project',
        qtyScreens: 6,
        projectType: 'responsive',
        cssProcessor: 'less',
      })
      .on('end', done);
  });

  it('creates expected base files', function() {
    assert.file([
      '.bowerrc',
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      'bower.json',
      'package.json',
      'gulpfile.js',
      'package.json',
      '.editorconfig',
      'screen_1.html',
      'screen_2.html',
      'screen_3.html',
      'screen_4.html',
      'screen_5.html',
      'screen_6.html',
      'assets/src',
      'assets/src/.gulp',
      'assets/src/fonts',
      'assets/src/icons',
      'assets/src/images',
      'assets/src/js',
      'assets/src/styles',
      'assets/src/vendor',
    ]);
  });

  it('should have the project name on package.json', function() {
    assert.fileContent('package.json',  /"name": "pixel2html-test-project"/);
  });


});
