import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Bootstrap 4 features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        frontEndFramework: 'bootstrap-4'
      })
      .toPromise()
  })

  it('Should list dependencies in package.json', function () {
    assert.fileContent('package.json', /"bootstrap"/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/styles.js',
      'gulp/tasks/scripts.js'
    ])
  })

  it('should exists vendor files', function () {
    assert.file([
      'src/assets/styles/vendor/vendor.scss',
      'src/assets/js/index.js'
    ])
  })

  it('should include bootstrap include', function () {
    assert.fileContent('src/assets/styles/vendor/vendor.scss', /import "bootstrap\/scss\/bootstrap.scss";/)
    assert.fileContent('src/assets/js/framework.js', /import 'bootstrap'/)
  })
})

describe('Bootstrap 3 features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        frontEndFramework: 'bootstrap-3'
      })
      .toPromise()
  })

  it('Should list dependencies in package.json', function () {
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
      'src/assets/styles/vendor/vendor.scss',
      'src/assets/js/index.js'
    ])
  })

  it('should include bootstrap include', function () {
    assert.fileContent('src/assets/styles/vendor/vendor.scss', /import "bootstrap-sass";/)
    assert.fileContent('src/assets/js/framework.js', /require\('bootstrap-sass'\)/)
  })

  it('should include correct paths on config file', function () {
    assert.fileContent('gulp/config.js', './node_modules/bootstrap-sass/assets/fonts/**/*')
  })
})
