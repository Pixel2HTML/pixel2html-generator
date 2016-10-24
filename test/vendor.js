'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');
describe('Vendors features', function() {
  describe('project with not vendor needs', function() {
    before('crafting project', function(done) {
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
          jQuery: false,
          frontEndFramework: false
        })
        .on('end', done);
    });

    it('should not have the vendor folder main gulp file', function() {
      assert.noFileContent('gulpfile.js', /vendor/);
    });
    it('should not create the vendor folder into the gulp files', function(){
      assert.noFile('src/assets/.gulp/vendor');
    })

  });

  describe('project with vendor needs', function() {
    before('crafting project', function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          clientId: '0987',
          projectName: '1234',
          qtyScreens: 6,
          markupLanguage: 'html',
          cssProcessor: 'less',
          jQuery: true,
          frontEndFramework: 'bootstrap'
        })
        .on('end', done);
    });

    it('should have the vendor folder main gulp file', function() {
      assert.fileContent('gulpfile.js', /vendor/);
    });
    it('should not create the vendor folder into the gulp files', function(){
      assert.file('src/assets/.gulp/vendor');
    })
  });
});
