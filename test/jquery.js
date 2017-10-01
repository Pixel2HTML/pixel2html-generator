import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('jQuery features', function () {
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

  it('should list dependencies in bower.json', function () {
    assert.fileContent('package.json', /"jquery"/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/tasks/scripts.js'
    ])
  })
})
