'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');



describe('jQuery features', function() {

  before('crafting project with jQuery', function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        clientId: '0987',
        projectName: '1234',
        qtyScreens: 3,
        cssProcessor: 'less',
        frontEndFramework: 'bootstrap',
        jQuery: true,
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('should exists dependencies in bower.json', function(){
      assert.fileContent('bower.json', /"jquery"/);
    });
  });

  describe('Checking jQuery gulp compile files', function() {

    it('should exists jQuery\'s gulp compile files', function() {
      assert.file('src/assets/.gulp/vendor/jquery.js');
    });

  });

});
