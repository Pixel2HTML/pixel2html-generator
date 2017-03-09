'use strict'
var path = require('path')
var helpers = require('yeoman-generator').test
var assert = require('yeoman-assert')

describe('jQuery features', function () {
  before('crafting project with jQuery', function (done) {
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
        jQuery: true
      })
      .on('end', done)
  })

  describe('Checking base files with dependencies', function () {
    it('should exists dependencies in bower.json', function () {
      assert.fileContent('package.json', /"jquery"/)
    })
  })

  describe('Checking jQuery files', function () {
    it('should exists a gulp routine', function () {
      assert.file([
        'src/assets/gulp/tasks/scripts.js'
      ])
    })

    it('should include correct paths on config file', function () {
      assert.fileContent('src/assets/gulp/config.js', './node_modules/jquery/dist/jquery.min.js')
    })
  })
})
