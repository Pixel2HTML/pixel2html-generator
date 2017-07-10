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
        clientId: '0987',
        projectId: '1234',
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        cssProcessor: 'scss'
      })
      .toPromise()
  })

  it('sould list dependencies on package.json', function () {
    assert.fileContent('package.json', /"gulp-sass"/)
  })

  it('should exists base SCSS file', function () {
    assert.file([
      'src/assets/styles/main.scss',
      'src/assets/styles/vendor.scss',
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

  it('should have project and client ids on comments', function () {
    assert.fileContent('src/assets/styles/screens/screen_1.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/screens/screen_2.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/screens/screen_3.scss', /Pixel2HTML/)
  })

  it('should have screen number on comments', function () {
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
