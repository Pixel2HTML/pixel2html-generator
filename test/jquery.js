import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('jQuery features', function () {
  before('crafting project with jQuery', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        clientId: '0987',
        projectId: '1234',
        qtyScreens: 3,
        markupLanguage: 'html',
        cssProcessor: 'less',
        frontEndFramework: 'bootstrap',
        jQuery: true
      })
      .on('end', done)
  })

  describe('Checking base files with dependencies', function () {
    it('should exists dependencies in bower.json', function () {
      assert.fileContent('package.json', /"jquery"/)
    })
  })

  describe('Checking jQuery files', function () {
    it('should exists a gulp routine', function () {
      assert.file([
        'gulp/tasks/scripts.js'
      ])
    })

    it('should include correct paths on config file', function () {
      assert.fileContent('gulp/config.js', './node_modules/jquery/dist/jquery.min.js')
    })
  })
})
