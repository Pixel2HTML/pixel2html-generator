'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('SCSS features', function() {

  before('crafting project', function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'test-project',
        qtyScreens: 3,
        cssProcessor: 'scss',
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('sould exists dependencies on package.json', function () {
      assert.fileContent('package.json',  /"gulp-sass"/);
    });
  });

  describe('Creating SCSS files', function() {

    it('should exists base SCSS file', function() {
      assert.file([
        'assets/src/styles/main.scss',
        'assets/src/styles/_reset.scss',
        'assets/src/styles/mixins.scss',
        'assets/src/styles/variables.scss',
        'assets/src/styles/screens/_base.scss',
        'assets/src/styles/components/_buttons.scss',
        'assets/src/styles/components/_footer.scss',
        'assets/src/styles/components/_header.scss',
        'assets/src/styles/components/_forms.scss',
        'assets/src/styles/components/_nav.scss',
      ]);
    });

    it('should exists screens SCSS files', function() {
      assert.file([
        'assets/src/styles/screens/screen_1.scss',
        'assets/src/styles/screens/screen_2.scss',
        'assets/src/styles/screens/screen_3.scss',
      ]);
    });

  });

});
