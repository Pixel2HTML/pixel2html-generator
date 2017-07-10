import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('LESS features', function () {
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
        cssProcessor: 'less'
      })
      .toPromise()
  })

  it('sould list dependencies on package.json', function () {
    assert.fileContent('package.json', /"gulp-less"/)
  })

  it('should exists base LESS file', function () {
    assert.file([
      'src/assets/styles/main.less',
      'src/assets/styles/_reset.less',
      'src/assets/styles/_mixins.less',
      'src/assets/styles/_variables.less',
      'src/assets/styles/screens/_base.less',
      'src/assets/styles/components/_buttons.less',
      'src/assets/styles/components/_footer.less',
      'src/assets/styles/components/_header.less',
      'src/assets/styles/components/_forms.less',
      'src/assets/styles/components/_nav.less'
    ])
  })

  it('should exists screens LESS files', function () {
    assert.file([
      'src/assets/styles/screens/screen_1.less',
      'src/assets/styles/screens/screen_2.less',
      'src/assets/styles/screens/screen_3.less'
    ])
  })

  it('should have project and client ids on comments', function () {
    assert.fileContent('src/assets/styles/screens/screen_1.less', /Pixel2HTML - 0987\/1234/)
    assert.fileContent('src/assets/styles/screens/screen_2.less', /Pixel2HTML - 0987\/1234/)
    assert.fileContent('src/assets/styles/screens/screen_3.less', /Pixel2HTML - 0987\/1234/)
  })

  it('should have screen number on comments', function () {
    assert.fileContent('src/assets/styles/screens/screen_1.less', /Screen 1/)
    assert.fileContent('src/assets/styles/screens/screen_2.less', /Screen 2/)
    assert.fileContent('src/assets/styles/screens/screen_3.less', /Screen 3/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/styles.js'
    ])
    assert.fileContent('gulp/tasks/styles.js', /\$\.less/)
  })

  it('should exists a pipe in the main:styles routing', function () {
    assert.fileContent('gulp/tasks/styles.js', /less()/)
  })
})
