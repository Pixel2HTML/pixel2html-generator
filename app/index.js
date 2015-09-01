'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
// var utils = require('utils.js');
var _ = require('underscore');

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

  },



  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(chalk.white.bgRed.bold('Welcome to Pixel2HTML Boilerplate Generator'));
    }

     var prompts = [
     {
      type    : 'input',
      name    : 'project_name',
      message : 'Your project name',
      required: true
    },
      {
        type: 'list',
        name: 'css_preprocessor',
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
      },
      {
        type: 'list',
        name: 'css_framework',
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
      },
      // jQuery
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Would you like to include jQuery?',
        default: true,
       },
       //Parsley
       {
        type: 'confirm',
        name: 'parsley',
        message: 'Do you have forms to validate? Include Parsley!',
       },
       {
        type: 'confirm',
        name: 'modernizer',
        message: 'Do you want to add Modernizr?',
       }
    ];

    this.prompt(prompts, function (answers) {
      console.log(answers);

      this.project_name     = answers.project_name;
      this.css_preprocessor = answers.css_preprocessor;
      this.css_framework    = answers.css_framework;
      this.jquery           = answers.jquery;
      this.parsley          = answers.parsley;
      this.modernizr        = answers.modernizr;

      done();
    }.bind(this));
  },


  paths: function() {
    this.destinationRoot('demo');
    this.paths = {
      src_fonts:    "assets/src/fonts",
      src_icons:    "assets/src/icons",
      src_images:   "assets/src/images",
      src_vendors:  "assets/src/vendors",
      src_js:       "assets/src/js",
      src_css_preprocessor: "assets/src/"+this.css_preprocessor
    };
  },

  writing: {

    createFolders: function() {
      mkdirp("assets");

      _.each(this.paths, function(path){
        console.log(path);
        mkdirp(path);
      });
    },


    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulp/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    packageJSON: function () {
      //Copy package.json and include css_preprocessor dependency.
      this.fs.copyTpl(
        this.templatePath('base/_package.json'),
        this.destinationPath('package.json'),
        {
          project_name    : this.project_name,
          css_preprocessor: this.css_preprocessor,
        }
      );
    },

    jshint: function () {
      this.fs.copy(
        this.templatePath('base/jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },
    git: function () {
      this.fs.copy(
        this.templatePath('git/gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('git/gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    bower: function () {
      var bowerJson = {
        name: 'pixel2html-'+_s.slugify(this.project_name),
        private: true,
        dependencies: {}
      };

      if (this.css_framework === 'bootstrap') {

        if (this.css_preprocessor === 'sass') {

          bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap-sass': {
              'main': [
                'assets/stylesheets/_bootstrap.scss',
                'assets/fonts/bootstrap/*',
                'assets/javascripts/bootstrap.js'
              ]
            }
          };
        }
        if(this.css_preprocessor === 'less') {

          bowerJson.dependencies['bootstrap'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap': {
              'main': [
                'less/bootstrap.less',
                'dist/css/bootstrap.css',
                'dist/js/bootstrap.js',
                'dist/fonts/*'
              ]
            }
          };
        }
        if(this.css_preprocessor === 'stylus') {
            bowerJson.dependencies['bootstrap'] = '~3.3.5';
            bowerJson.overrides = {
              'bootstrap': {
                'main': [
                  'stylus/bootstrap.stylus',
                  'dist/css/bootstrap.css',
                  'dist/js/bootstrap.js',
                  'dist/fonts/*'
                ]
              }
            };
        }
      }
      if (this.jquery) {
        bowerJson.dependencies['jquery'] = '~2.1.*';
      }
      if (this.parsley) {
        bowerJson.dependencies['parsleyjs'] = '~2.2.*';
      }
      if (this.modernizer) {
        bowerJson.dependencies['modernizr'] = '~2.8.*';
      }

      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bower/bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('base/editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    misc: function () {
      // this.fs.copy(
      //   this.templatePath('misc/favicon.ico'),
      //   this.destinationPath('assets/src/icons/favicon.ico')
      // );

      // this.fs.copy(
      //   this.templatePath('misc/apple-touch-icon.png'),
      //   this.destinationPath('assets/src/icons/apple-touch-icon.png')
      // );

      this.fs.copy(
        this.templatePath('misc/robots.txt'),
        this.destinationPath('robots.txt'));
    },


});
