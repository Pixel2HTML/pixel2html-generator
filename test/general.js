'use strict'

var path = require('path')
var helpers = require('yeoman-generator').test
var assert = require('yeoman-assert')

describe('general', function () {
  before('crafting project', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        clientId: '0987',
        projectId: '1234',
        qtyScreens: 6,
        markupLanguage: 'html',
        cssProcessor: 'less'
      })
      .on('end', done)
  })

  it('creates expected base files', function () {
    assert.file([
      '.gitignore',
      '.gitattributes',
      'package.json',
      'gulpfile.js',
      'package.json',
      '.editorconfig',
      'LICENSE',
      'src/screen-1.html',
      'src/screen-2.html',
      'src/screen-3.html',
      'src/screen-4.html',
      'src/screen-5.html',
      'src/screen-6.html',
      'gulp',
      'gulp/config.js',
      'gulp/tasks',
      'gulp/tasks/styles.js',
      'gulp/tasks/scripts.js',
      'gulp/tasks/fonts.js',
      'gulp/tasks/static.js',
      'gulp/tasks/markup.js',
      'src/assets/fonts',
      'src/assets/icons',
      'src/assets/images',
      'src/assets/js',
      'src/assets/styles',
      'src/assets/vendor'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('package.json', /"name": "pixel2html-0987-1234"/)
  })
})
