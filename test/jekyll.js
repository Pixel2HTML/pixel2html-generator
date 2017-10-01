import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Jekyll Features', function () {
  describe('Jekyll Project', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          clientId: '0987',
          projectId: '1234',
          projectName: 'Pixel2HTML',
          qtyScreens: 6,
          markupLanguage: 'html',
          markupIntegration: 'jekyll',
          cssProcessor: 'less'
        })
        .toPromise()
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
      assert.fileContent('package.json', /"name": "Pixel2HTML"/)
    })

    it('should have the gulp routine in gulp default\'s task', function () {
      assert.fileContent('gulpfile.js', /'jekyll'/)
      assert.noFileContent('gulpfile.js', /'markup'/)
    })

    it('Gemfile should have the usage of Jekyll Gem', function () {
      assert.fileContent('Gemfile', /gem 'jekyll'/)
    })
  })
})
