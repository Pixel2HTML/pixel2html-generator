'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('underscore');
var optionOrPrompt = require('yeoman-option-or-prompt');
var util = require('util');
var path = require('path');

var Generator = module.exports = function Generator(args, options) {

  yeoman.generators.Base.apply(this, arguments);

  this.destinationRoot('demo');

  this.argument('projectName', { type: String, required: false });
  this.projectName = _s.camelize(_s.slugify(_s.humanize(this.projectName)));


};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    this.log(
      chalk.white.bgRed.bold(
        'Welcome to Pixel2HTML Boilerplate Generator'
      )
    );
  }
};

Generator.prototype.askForProjectName = function askForProjectName(){

  var cb = this.async();

  if(this.projectName){
    return;
  }

  this.prompt(
    [{
      type: 'input',
      name: 'projectName',
      message: 'Give me the Project Name!',
    }],
    function (props) {
      this.projectName = props.projectName;
      cb();
    }.bind(this)
  );
};

Generator.prototype.pageType = function pageType() {
  this.prompt([{
    type: 'list',
    name: 'pageType',
    message: 'What type of page you will code? Pick one',
    choices: [
      {
        name: 'Responsive',
        value: 'responsive',
      }, {
        name: 'Mobile',
        value: 'mobile',
      }, {
        name: 'Newsletter',
        value: 'newsletter',
      }
    ]
  }],
  function (props) {
    this.cssPreprocessor = props.cssPreprocessor;
    cb();
  }.bind(this));
}

Generator.prototype.askForCssPreprocessor = function askForCssPreprocessor() {
  var gulp = true;
  var cb = this.async();

  this.prompt([{
    type: 'list',
    name: 'cssPreprocessor',
    message: 'What preprocessor would you like to use? Pick one',
    choices: [
      {
        name: 'Sass',
        value: 'sass',
      }, {
        name: 'Less',
        value: 'less',
      }, {
        name: 'Stylus',
        value: 'stylus',
      }
    ]
  }],
  function (props) {
    this.cssPreprocessor = props.cssPreprocessor;
    cb();
  }.bind(this));
};

Generator.prototype.askForFramework = function askForFramework(){
  var cssPreprocessor = this.cssPreprocessor;
  var cb = this.async();

   this.prompt([{
      type: 'list',
      name: 'cssFramework',
      message: 'What CSS Framework do you like to include?',
      choices: [{
          name: 'BassCss',
          value: 'basscss',
        }, {
          name: 'Bootstrap',
          value: 'bootstrap',
        }, {
          name: 'Foundation',
          value: 'foundation',
        }
      ]
  }],
  function (props) {
    this.cssPreprocessor = props.cssPreprocessor;
    cb();
  }.bind(this));
};

Generator.prototype.askForjQuery = function askForjQuery() {
  var cb = this.async();
  var cssFramework = this.cssFramework;

  this.prompt([{
    type: 'confirm',
    name: 'jquery',
    message: 'Would you like to use jQuery?',
    default: true,
    when: function () {
      return cssFramework;
    }
  }], function (props) {
    this.jquery = props.jquery;
    cb();
  }.bind(this));
};

Generator.prototype.askForJsModules = function askForJsModules() {
  var cb = this.async();
  var jquery = this.jquery;

  var prompts = [
  {
    type: 'checkbox',
    name: 'jsModules',
    message: 'Which modules would you like to include?',
    choices: [
      {
        value: 'parsleyjs',
        name: 'Form validation with Parsley.js',
        checked: true
      }, {
        value: 'slider',
        name: 'Slider.js',
        checked: false
      }, {
        value: 'tabs',
        name: 'tabs.js',
        checked: false
      }
    ],
    when: function (jquery) {
      return jquery;
    }
  }
  ];

  this.prompt(prompts, function(props){

    var hasMod = function (mod) {
      return _.contains(props.jsModules, mod);
    };

    this.parsleyjs  = hasMod('parsleyjs');
    this.slider     = hasMod('slider');
    this.tabs       = hasMod('tabs');

    cb();
  }.bind(this));
};

Generator.prototype.packageFiles = function packageFiles(){

    this.log(chalk.yellow('Copying gulpfile.'));
    this.fs.copyTpl(
      this.templatePath('gulp/_gulpfile.js'),
      this.destinationPath(
          path.join(this.appPath, 'gulpfile.js'))
    );

    this.log(chalk.yellow('Copying package.json file and adding dependencies.'));
    this.fs.copyTpl(
      this.templatePath('base/_package.json'),
      this.destinationPath('package.json'),
      {
        projectName    : this.projectName,
        cssPreprocessor: this.cssPreprocessor
      }
    );

    this.log(chalk.yellow('Copying jshintrc file.'));
    this.fs.copy(
      this.templatePath('base/jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.log(chalk.yellow('Copying git files.'));
    this.fs.copy(
      this.templatePath('git/gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('git/gitattributes'),
      this.destinationPath('.gitattributes')
    );
};
