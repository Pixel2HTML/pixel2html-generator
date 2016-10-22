'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');



describe('Bootstrap features', function() {

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
        cssProcessor: 'less',
        frontEndFramework: 'bootstrap',
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('Should exists dependencies in package.json', function () {
      assert.fileContent('package.json',  /"gulp-sass"/);
    });
    it('should exists dependencies in bower.json', function(){
      assert.fileContent('bower.json', /"bootstrap-sass"/);
    });
  });

  describe('Checking Bootstrap files', function() {

    it('should exists bootstrap\'s user config files', function() {
      assert.file([
        'src/assets/styles/vendor/bootstrap/index.scss',
        'src/assets/styles/vendor/bootstrap/variables.scss',
      ]);
    });

  });

});
