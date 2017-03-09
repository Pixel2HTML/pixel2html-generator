'use strict'
var path = require('path')
var helpers = require('yeoman-generator').test
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
        'src/screen_1.html',
        'src/screen_2.html',
        'src/screen_3.html',
        'src/screen_4.html',
        'src/screen_5.html',
        'src/screen_6.html',
        'src/assets/gulp',
        'src/assets/gulp/tasks',
        'src/assets/gulp/tasks/fonts.js',
        'src/assets/gulp/tasks/jekyll.js',
        'src/assets/gulp/tasks/static.js',
        'src/assets/gulp/tasks/styles.js',
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
        'src/assets/gulp/tasks/jekyll.js'
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
