'use strict'
var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')

describe('SCSS features', function () {
  before('crafting project', function (done) {
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
        cssProcessor: 'scss'
      })
      .on('end', done)
  })

  describe('Checking base files with dependencies', function () {
    it('sould exists dependencies on package.json', function () {
      assert.fileContent('package.json', /"gulp-sass"/)
    })
  })

  describe('Creating SCSS files', function () {
    it('should exists base SCSS file', function () {
      assert.file([
        'src/assets/styles/main.scss',
        'src/assets/styles/_reset.scss',
        'src/assets/styles/_mixins.scss',
        'src/assets/styles/_variables.scss',
        'src/assets/styles/screens/_base.scss',
        'src/assets/styles/components/_buttons.scss',
        'src/assets/styles/components/_footer.scss',
        'src/assets/styles/components/_header.scss',
        'src/assets/styles/components/_forms.scss',
        'src/assets/styles/components/_nav.scss'
      ])
    })

    it('should exists screens SCSS files', function () {
      assert.file([
        'src/assets/styles/screens/screen_1.scss',
        'src/assets/styles/screens/screen_2.scss',
        'src/assets/styles/screens/screen_3.scss'
      ])
    })

    it('should have project and client ids on comments', function() {
      assert.fileContent('src/assets/styles/screens/screen_1.scss', /Pixel2HTML - 0987\/1234/)
      assert.fileContent('src/assets/styles/screens/screen_2.scss', /Pixel2HTML - 0987\/1234/)
      assert.fileContent('src/assets/styles/screens/screen_3.scss', /Pixel2HTML - 0987\/1234/)
    })

    it('should have screen number on comments', function() {
      assert.fileContent('src/assets/styles/screens/screen_1.scss', /Screen 1/)
      assert.fileContent('src/assets/styles/screens/screen_2.scss', /Screen 2/)
      assert.fileContent('src/assets/styles/screens/screen_3.scss', /Screen 3/)
    })

    it('should exists a gulp routine', function () {
      assert.file([
        'gulp/tasks/styles.js'
      ])
      assert.fileContent('gulp/tasks/styles.js', /\$\.sass/)
    })

    it('should exists a pipe in the main:styles routing', function () {
      assert.fileContent('gulp/tasks/styles.js', /sass()/)
    })
  })
})
