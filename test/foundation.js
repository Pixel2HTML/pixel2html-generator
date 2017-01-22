'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');



describe('Foundation features', function() {

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
        cssProcessor: 'scss',
        frontEndFramework: 'foundation',
      })
      .on('end', done);
  });

  describe('Checking base files with dependencies', function(){
    it('Should exists dependencies in package.json', function () {
      assert.fileContent('package.json',  /"gulp-sass"/);
      assert.fileContent('package.json', /"foundation-sites"/);
    });
  });

  describe('Checking Foundation files', function() {
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
      assert.fileContent('src/assets/styles/vendor.scss', /import "foundation";/)
    });

    it('should include correct paths on config file', function(){
      assert.fileContent('src/assets/gulp/config.js', './node_modules/foundation-sites/scss')
      assert.fileContent('src/assets/gulp/config.js', './node_modules/foundation-sites/dist/js/foundation.min.js')
    });

    it('should include foundation initializer on main.js', function(){
      assert.fileContent('src/assets/js/main.js', /\$\(document\)\.foundation\(\)/);
    });

  });

});
