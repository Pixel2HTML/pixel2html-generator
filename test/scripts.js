import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Script features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        frontEndFramework: 'bootstrap-4',
        jQuery: true
      })
      .toPromise()
  })

  it('creates expected base files', function () {
    assert.file([
      'src/assets/js/index.js',
      'src/assets/js/app.js',
      'webpack.config.js',
      'webpack/commonPlugins.js',
      'webpack/debugPlugins.js',
      'webpack/developmentPlugins.js',
      'webpack/paths.js',
      'webpack/productionPlugins.js'
    ])
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/common/scripts.js'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('src/assets/js/app.js', /Pixel2HTML/)
  })
})
