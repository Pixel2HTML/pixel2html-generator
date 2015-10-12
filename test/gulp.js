'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var fs = require('fs');
var exec = require('child_process').exec;


describe('Gulp features', function() {
  // var instancePath = path.join(__dirname, '../.test-instance');

  before('crafting project', function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withPrompts({
        projectName: 'test-project',
        qtyScreens: 6,
        cssProcessor: 'less',
      })
      .on('ready', function (generator) {
        exec
      })
      .on('end', done);
  });

  it('created expected files', function() {
    assert.file('package.json');
  })
})
