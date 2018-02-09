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
      'src/index.html',
      'src/screen-2.html',
      'src/screen-3.html',
      'src/screen-4.html',
      'src/screen-5.html',
      'src/screen-6.html',
      'gulp',
      'gulp/config.js',
      'gulp/common/styles.js',
      'gulp/development/watch.js',
      'gulp/development/serve.js',
      'gulp/common/scripts.js',
      'gulp/common/fonts.js',
      'gulp/common/static.js',
      'gulp/common/markup.js',
      'gulp/production/critical.js',
      'gulp/production/minifyStyles.js',
      'gulp/production/styles-production.js',
      'gulp/production/purify.js',
      'src/assets/fonts',
      'src/assets/icons',
      'src/assets/images',
      'src/assets/js',
      'src/assets/head/favico.ico',
      'src/assets/head/favicon.png',
      'src/assets/head/manifest.json',
      'src/assets/styles'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('package.json', /"name": "Pixel2HTML"/)
  })
})
