'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');


describe('LESS features', function() {

  before('crafting project', function(done) {
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
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('sould exists dependencies on package.json', function () {
      assert.fileContent('package.json',  /"gulp-less"/);
    });
  });

  describe('Creating LESS files', function() {

    it('should exists base LESS file', function() {
      assert.file([
        'assets/src/styles/main.less',
        'assets/src/styles/_reset.less',
        'assets/src/styles/mixins.less',
        'assets/src/styles/variables.less',
        'assets/src/styles/screens/_base.less',
        'assets/src/styles/components/_buttons.less',
        'assets/src/styles/components/_footer.less',
        'assets/src/styles/components/_header.less',
        'assets/src/styles/components/_forms.less',
        'assets/src/styles/components/_nav.less',
      ]);
    });

    it('should exists screens LESS files', function() {
      assert.file([
        'assets/src/styles/screens/screen_1.less',
        'assets/src/styles/screens/screen_2.less',
        'assets/src/styles/screens/screen_3.less',
      ]);
    });
  });

});
