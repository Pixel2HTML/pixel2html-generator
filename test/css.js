'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('CSS features', function() {

  before('crafting project', function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        clientId: '0987',
        projectId: '1234',
        qtyScreens: 3,
        markupLanguage: 'html',
        cssProcessor: false,
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('sould not exists any dependencies on package.json', function () {
      assert.noFileContent('package.json',  /"gulp-sass"/);
      assert.noFileContent('package.json',  /"gulp-less"/);
    });
  });

  describe('Creating CSS files', function() {
    it('should exists base CSS file', function() {
      assert.file(['src/assets/styles/main.css']);
    });
  });

});
