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
        projectId: '1234',
        qtyScreens: 3,
        markupLanguage: 'html',
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
        'src/assets/styles/main.less',
        'src/assets/styles/_reset.less',
        'src/assets/styles/_mixins.less',
        'src/assets/styles/_variables.less',
        'src/assets/styles/screens/_base.less',
        'src/assets/styles/components/_buttons.less',
        'src/assets/styles/components/_footer.less',
        'src/assets/styles/components/_header.less',
        'src/assets/styles/components/_forms.less',
        'src/assets/styles/components/_nav.less',
      ]);
    });

    it('should exists screens LESS files', function() {
      assert.file([
        'src/assets/styles/screens/screen_1.less',
        'src/assets/styles/screens/screen_2.less',
        'src/assets/styles/screens/screen_3.less',
      ]);
    });

    it('should exists a gulp routine', function(){
      assert.file([
        'src/assets/gulp/tasks/styles.js'
      ]);
      assert.fileContent('src/assets/gulp/tasks/styles.js',  /gulp-less/);
    });

    it('should exists a pipe in the main:styles routing', function() {
      assert.fileContent('src/assets/gulp/tasks/styles.js', /less()/);
    });
  });

});
