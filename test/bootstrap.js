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
        markupLanguage: 'html',
        cssProcessor: 'less',
        frontEndFramework: 'bootstrap',
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('Should exists dependencies in package.json', function () {
      assert.fileContent('package.json',  /"gulp-sass"/);
      assert.fileContent('package.json', /"bootstrap"/);
    });
  });

  describe('Checking Bootstrap files', function() {
    it('should exists a gulp routine', function(){
      assert.file([
        'src/assets/gulp/tasks/styles.js',
        'src/assets/gulp/tasks/scripts.js'
      ])
    });
    it('should exists vendor files', function() {
      assert.file([
        'src/assets/styles/vendor.scss'
      ]);
    });

    it('should include bootstrap include', function() {
      assert.fileContent('src/assets/styles/vendor.scss', /import "bootstrap";/)
    });

    it('should include correct paths on config file', function(){
      assert.fileContent('src/assets/gulp/config.js', './node_modules/bootstrap/scss')
      assert.fileContent('src/assets/gulp/config.js', './node_modules/bootstrap/dist/js/bootstrap.min.js')
    })

  });

});
