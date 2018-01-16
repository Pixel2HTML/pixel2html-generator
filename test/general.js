import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('General Assertions', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 6,
        markupLanguage: 'html'
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
      'webpack.config.js',
      '.tern-project',
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
      'gulp/tasks/watch.js',
      'gulp/tasks/serve.js',
      'gulp/tasks/scripts.js',
      'gulp/tasks/fonts.js',
      'gulp/tasks/static.js',
      'gulp/tasks/markup.js',
      'gulp/tasks/critical.js',
      'gulp/tasks/minifyStyles.js',
      'gulp/tasks/styles-production.js',
      'gulp/tasks/purify.js',
      'src/assets/fonts',
      'src/assets/icons',
      'src/assets/images',
      'src/assets/js',
      'src/assets/styles'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('package.json', /"name": "Pixel2HTML"/)
  })
})
