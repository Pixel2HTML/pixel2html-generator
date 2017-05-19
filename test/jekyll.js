'use strict'
var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')

describe('Jekyll Features', function () {
  describe('Jekyll Project', function () {
    before('crafting  project', function (done) {
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
          markupIntegration: 'jekyll',
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
        'Gemfile',
        '_config.yml',
        'src/screen-1.html',
        'src/screen-2.html',
        'src/screen-3.html',
        'src/screen-4.html',
        'src/screen-5.html',
        'src/screen-6.html',
        'gulp',
        'gulp/tasks',
        'gulp/tasks/fonts.js',
        'gulp/tasks/jekyll.js',
        'gulp/tasks/static.js',
        'gulp/tasks/styles.js',
        'src/assets/fonts',
        'src/assets/icons',
        'src/assets/images',
        'src/assets/js',
        'src/assets/styles',
        'src/assets/vendor',
        'src/_layouts',
        'src/_layouts/default.html',
        'src/_includes',
        'src/_includes/shared/head.html',
        'src/_includes/shared/foot.html',
        'gulp/tasks/jekyll.js'
      ])
    })

    it('should have the project name on package.json', function () {
      assert.fileContent('package.json', /"name": "pixel2html-0987-1234"/)
    })

    it('should have the gulp routine in gulp default\'s task', function () {
      assert.fileContent('gulpfile.js', /'jekyll:build'/)
      assert.noFileContent('gulpfile.js', /'main:markup'/)
    })

    it('Gemfile should have the usage of Jekyll Gem', function () {
      assert.fileContent('Gemfile', /gem 'jekyll'/)
    })
  })
})
