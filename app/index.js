'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    //just to clean up the log file
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
       // {
       //  name: 'project_name',
       //  message: 'What preprocessor would you like to use? Pick one',
       // },
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
        default: true
       },
       //Parsley
       {
        type: 'confirm',
        name: 'parsley',
        message: 'Do you have forms to validate? Include Parsley!',
       }
    ];

    this.prompt(prompts, function (answers) {
      console.log(answers);

      this.project_name     = answers.project_name;
      this.css_preprocessor = answers.css_preprocessor;
      this.css_framework    = answers.css_framework;
      this.jquery           = answers.jquery;
      this.parsley          = answers.parsley;

      done();
    }.bind(this));
  },

  writing: {
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

    // bower: function () {
    //   var bowerJson = {
    //     name: _s.slugify(this.appname),
    //     private: true,
    //     dependencies: {}
    //   };

    //   if (this.includeBootstrap) {
    //     if (this.includeSass) {
    //       bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
    //       bowerJson.overrides = {
    //         'bootstrap-sass': {
    //           'main': [
    //             'assets/stylesheets/_bootstrap.scss',
    //             'assets/fonts/bootstrap/*',
    //             'assets/javascripts/bootstrap.js'
    //           ]
    //         }
    //       };
    //     } else {
    //       bowerJson.dependencies['bootstrap'] = '~3.3.5';
    //       bowerJson.overrides = {
    //         'bootstrap': {
    //           'main': [
    //             'less/bootstrap.less',
    //             'dist/css/bootstrap.css',
    //             'dist/js/bootstrap.js',
    //             'dist/fonts/*'
    //           ]
    //         }
    //       };
    //     }
    //   } else if (this.includeJQuery) {
    //     bowerJson.dependencies['jquery'] = '~2.1.1';
    //   }

    //   if (this.includeModernizr) {
    //     bowerJson.dependencies['modernizr'] = '~2.8.1';
    //   }

    //   this.fs.writeJSON('bower.json', bowerJson);
    //   this.fs.copy(
    //     this.templatePath('bowerrc'),
    //     this.destinationPath('.bowerrc')
    //   );
    // },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('base/editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    // h5bp: function () {
    //   this.fs.copy(
    //     this.templatePath('favicon.ico'),
    //     this.destinationPath('app/favicon.ico')
    //   );

    //   this.fs.copy(
    //     this.templatePath('apple-touch-icon.png'),
    //     this.destinationPath('app/apple-touch-icon.png')
    //   );

    //   this.fs.copy(
    //     this.templatePath('robots.txt'),
    //     this.destinationPath('app/robots.txt'));
    // },

    // styles: function () {
    //   var css = 'main';

    //   if (this.includeSass) {
    //     css += '.scss';
    //   } else {
    //     css += '.css';
    //   }

    //   this.fs.copyTpl(
    //     this.templatePath(css),
    //     this.destinationPath('app/styles/' + css),
    //     {
    //       includeBootstrap: this.includeBootstrap
    //     }
    //   );
    // },

    // scripts: function () {
    //   this.fs.copy(
    //     this.templatePath('main.js'),
    //     this.destinationPath('app/scripts/main.js')
    //   );
    // },

    // html: function () {
    //   var bsPath;

    //   // path prefix for Bootstrap JS files
    //   if (this.includeBootstrap) {
    //     bsPath = '/bower_components/';

    //     if (this.includeSass) {
    //       bsPath += 'bootstrap-sass/assets/javascripts/bootstrap/';
    //     } else {
    //       bsPath += 'bootstrap/js/';
    //     }
    //   }

    //   this.fs.copyTpl(
    //     this.templatePath('index.html'),
    //     this.destinationPath('app/index.html'),
    //     {
    //       appname: this.appname,
    //       includeSass: this.includeSass,
    //       includeBootstrap: this.includeBootstrap,
    //       includeModernizr: this.includeModernizr,
    //       includeJQuery: this.includeJQuery,
    //       bsPath: bsPath,
    //       bsPlugins: [
    //         'affix',
    //         'alert',
    //         'dropdown',
    //         'tooltip',
    //         'modal',
    //         'transition',
    //         'button',
    //         'popover',
    //         'carousel',
    //         'scrollspy',
    //         'collapse',
    //         'tab'
    //       ]
    //     }
    //   );
    // },

    // misc: function () {
    //   mkdirp('app/images');
    //   mkdirp('app/fonts');
    // }
  },

  // install: function () {
  //   this.installDependencies({
  //     skipMessage: this.options['skip-install-message'],
  //     skipInstall: this.options['skip-install']
  //   });
  // },

  // end: function () {
  //   var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));
  //   var howToInstall =
  //     '\nAfter running ' +
  //     chalk.yellow.bold('npm install & bower install') +
  //     ', inject your' +
  //     '\nfront end dependencies by running ' +
  //     chalk.yellow.bold('gulp wiredep') +
  //     '.';

  //   if (this.options['skip-install']) {
  //     this.log(howToInstall);
  //     return;
  //   }

  //   // wire Bower packages to .html
  //   wiredep({
  //     bowerJson: bowerJson,
  //     directory: 'bower_components',
  //     exclude: ['bootstrap-sass', 'bootstrap.js'],
  //     ignorePath: /^(\.\.\/)*\.\./,
  //     src: 'app/index.html'
  //   });

  //   if (this.includeSass) {
  //     // wire Bower packages to .scss
  //     wiredep({
  //       bowerJson: bowerJson,
  //       directory: 'bower_components',
  //       ignorePath: /^(\.\.\/)+/,
  //       src: 'app/styles/*.scss'
  //     });
  //   }
  // }
});
