import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('SCSS features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html'
      })
      .toPromise()
  })

  it('should exists base SCSS file', function () {
    assert.file([
      'src/assets/styles/main/components/_buttons.scss',
      'src/assets/styles/main/components/_forms.scss',
      'src/assets/styles/main/screens/_base.scss',
      'src/assets/styles/main/_mixins.scss',
      'src/assets/styles/main/_variables.scss',
      'src/assets/styles/main/main.scss',
      'src/assets/styles/vendor/_reset.scss',
      'src/assets/styles/vendor/vendor.scss'
    ])
  })

  it('should exists screens SCSS files', function () {
    assert.file([
      'src/assets/styles/main/screens/screen_1.scss',
      'src/assets/styles/main/screens/screen_2.scss',
      'src/assets/styles/main/screens/screen_3.scss'
    ])
  })

  it('should have project and client ids on comments', function () {
    assert.fileContent('src/assets/styles/main/screens/screen_1.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/main/screens/screen_2.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/main/screens/screen_3.scss', /Pixel2HTML/)
  })

  it('should have screen number on comments', function () {
    assert.fileContent('src/assets/styles/main/screens/screen_1.scss', /Screen 1/)
    assert.fileContent('src/assets/styles/main/screens/screen_2.scss', /Screen 2/)
    assert.fileContent('src/assets/styles/main/screens/screen_3.scss', /Screen 3/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/common/styles.js',
      'gulp/common/cssModulesWrite.js',
      'gulp/production/critical.js',
      'gulp/production/minifyStyles.js',
      'gulp/production/purify.js',
      'gulp/production/styles-production.js'
    ])
  })

  it('should exists a pipe in the main:styles routing', function () {
    assert.fileContent('gulp/common/styles.js', /styles/)
  })
})
