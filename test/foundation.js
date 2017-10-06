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
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
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
      'src/assets/styles/vendor.scss',
      'src/assets/js/general/foundation.js'
    ])
  })

  it('should include foundation include', function () {
    assert.fileContent('src/assets/styles/vendor.scss', /import "foundation-sites\/scss\/foundation";/)
    assert.fileContent('src/assets/js/general/index.js', /import '.\/foundation'/)
  })
})
