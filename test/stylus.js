'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('Stylus features', function() {

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
        cssProcessor: 'styl',
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('sould exists dependencies on package.json', function () {
      assert.fileContent('package.json',  /"gulp-stylus"/);
    });
  });

  describe('Creating Stylus files', function() {

    it('should exists base Stylus file', function() {
      assert.file([
        'assets/src/styles/main.styl',
        'assets/src/styles/_reset.styl',
        'assets/src/styles/mixins.styl',
        'assets/src/styles/variables.styl',
        'assets/src/styles/screens/_base.styl',
        'assets/src/styles/components/_buttons.styl',
        'assets/src/styles/components/_footer.styl',
        'assets/src/styles/components/_header.styl',
        'assets/src/styles/components/_forms.styl',
        'assets/src/styles/components/_nav.styl',
      ]);
    });

    it('should exists screens Stylus files', function() {
      assert.file([
        'assets/src/styles/screens/screen_1.styl',
        'assets/src/styles/screens/screen_2.styl',
        'assets/src/styles/screens/screen_3.styl',
      ]);
    });

  });

});
