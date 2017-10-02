import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Foundation features', function () {
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
        cssProcessor: 'scss',
        frontEndFramework: 'foundation'
      })
      .toPromise()
  })

  it('Should exists dependencies in package.json', function () {
    assert.fileContent('package.json', /"gulp-sass"/)
    assert.fileContent('package.json', /"foundation-sites"/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/styles.js',
      'gulp/tasks/scripts.js'
    ])
  })
  it('should exists vendor files', function () {
    assert.file([
      'src/assets/styles/vendor.scss'
    ])
  })

  it('should include bootstrap include', function () {
    assert.fileContent('src/assets/styles/vendor.scss', /import "foundation-sites";/)
  })

  it('should include foundation initializer on main.js', function () {
    assert.fileContent('src/assets/js/main.js', /\$\(document\)\.foundation\(\)/)
  })
})
