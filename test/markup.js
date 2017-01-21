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
        'src/assets/gulp',
        'src/assets/gulp/tasks',
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

    it('should exists a gulp routine', function() {
      assert.file(['src/assets/gulp/tasks/markup.js']);
    });

    it('should have the gulp routine in gulp default\'s task', function() {
      assert.fileContent('gulpfile.js',  /'main:markup'/);
      assert.noFileContent('gulpfile.js',  /'jekyll:build'/);
    });
  });

  describe('PUG Project', function(){
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
          markupLanguage: 'pug',
          cssProcessor: 'less',
        })
        .on('end', done);
    });

    describe('Checking base files with dependencies', function() {
      it('sould exists dependencies on package.json', function () {
        assert.fileContent('package.json',  /"gulp-pug"/);
      });
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
        'src/screen_1.pug',
        'src/screen_2.pug',
        'src/screen_3.pug',
        'src/screen_4.pug',
        'src/screen_5.pug',
        'src/screen_6.pug',
        'src/assets/gulp',
        'src/assets/gulp/tasks',
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

    it('should exists a gulp routine', function() {
      assert.file([
        'src/assets/gulp/tasks/markup.js'
      ]);
      assert.fileContent('src/assets/gulp/tasks/markup.js',  /gulp-pug/);
    });

    it('should exists a pipe in the main:markup', function() {
      assert.fileContent('src/assets/gulp/tasks/markup.js', /pug\(/);
    });

    it('should have the gulp routine in gulp default\'s task', function() {
      assert.fileContent('gulpfile.js',  /'main:markup'/);
      assert.noFileContent('gulpfile.js',  /'jekyll:build'/);
    });
  });


});
