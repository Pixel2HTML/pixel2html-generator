import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Bootstrap features', function () {
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
        frontEndFramework: 'bootstrap'
      })
      .toPromise()
  })

  it('Should list dependencies in package.json', function () {
    assert.fileContent('package.json', /"gulp-sass"/)
    assert.fileContent('package.json', /"bootstrap-sass"/)
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
    assert.fileContent('src/assets/styles/vendor.scss', /import "bootstrap";/)
  })

  it('should include correct paths on config file', function () {
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/stylesheets')
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
  })

  it('should include correct paths on config file', function () {
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/stylesheets')
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/fonts/**/*')
  })
})
