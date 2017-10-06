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
        clientId: '0987',
        projectId: '1234',
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        cssProcessor: 'less',
        frontEndFramework: 'bootstrap',
        jQuery: true
      })
      .toPromise()
  })

  it('creates expected base files', function () {
    assert.file([
      'src/assets/js',
      'src/assets/js/main.js',
      'src/assets/js/general/index.js',
      '.babelrc'
    ])
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/scripts.js'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('src/assets/js/main.js', /Pixel2HTML/)
  })
})
