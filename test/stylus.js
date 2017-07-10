import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Stylus features', function () {
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
        cssProcessor: 'styl'
      })
      .toPromise()
  })

  it('sould list dependencies on package.json', function () {
    assert.fileContent('package.json', /"gulp-stylus"/)
  })

  it('should exists base Stylus file', function () {
    assert.file([
      'src/assets/styles/main.styl',
      'src/assets/styles/_reset.styl',
      'src/assets/styles/_mixins.styl',
      'src/assets/styles/_variables.styl',
      'src/assets/styles/screens/_base.styl',
      'src/assets/styles/components/_buttons.styl',
      'src/assets/styles/components/_footer.styl',
      'src/assets/styles/components/_header.styl',
      'src/assets/styles/components/_forms.styl',
      'src/assets/styles/components/_nav.styl'
    ])
  })

  it('should exists screens Stylus files', function () {
    assert.file([
      'src/assets/styles/screens/screen_1.styl',
      'src/assets/styles/screens/screen_2.styl',
      'src/assets/styles/screens/screen_3.styl'
    ])
  })

  it('should have project and client ids on comments', function () {
    assert.fileContent('src/assets/styles/screens/screen_1.styl', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/screens/screen_2.styl', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/screens/screen_3.styl', /Pixel2HTML/)
  })

  it('should have screen number on comments', function () {
    assert.fileContent('src/assets/styles/screens/screen_1.styl', /Screen 1/)
    assert.fileContent('src/assets/styles/screens/screen_2.styl', /Screen 2/)
    assert.fileContent('src/assets/styles/screens/screen_3.styl', /Screen 3/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/styles.js'
    ])
    assert.fileContent('gulp/tasks/styles.js', /\$\.stylus/)
  })

  it('should exists a pipe in the main:styles routing', function () {
    assert.fileContent('gulp/tasks/styles.js', /stylus()/)
  })
})
