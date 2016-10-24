'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');

describe('Markup Features', function() {
  describe('HTML Project', function(){

    before('crafting  project', function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          clientId: '0987',
          projectId: '1234',
          qtyScreens: 6,
          markupLanguage: 'html',
          cssProcessor: 'less',
        })
        .on('end', done);
    });

    it('creates expected base files', function() {
      assert.file([
        '.bowerrc',
        '.gitignore',
        '.gitattributes',
        'bower.json',
        'package.json',
        'gulpfile.js',
        'package.json',
        '.editorconfig',
        'src/screen_1.html',
        'src/screen_2.html',
        'src/screen_3.html',
        'src/screen_4.html',
        'src/screen_5.html',
        'src/screen_6.html',
        'src/assets/.gulp',
        'src/assets/fonts',
        'src/assets/icons',
        'src/assets/images',
        'src/assets/js',
        'src/assets/styles',
        'src/assets/vendor',
      ]);
    });

    it('should have the project name on package.json', function() {
      assert.fileContent('package.json',  /"name": "pixel2html-0987-1234"/);
    });
  });

});
