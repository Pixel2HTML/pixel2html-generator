'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('underscore');
var optionOrPrompt = require('yeoman-option-or-prompt');


module.exports = generators.Base.extend({

  // _optionOrPrompt: optionOrPrompt,


  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('skip_welcome_message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.argument('projectName', { type: String, required: true });
    this.projectName = _.camelCase(this.projectName);


    this.fs.delete('demo');
    mkdirp('demo');
      this.destinationRoot('demo');
  },

  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  prompting: function () {
    var done = this.async();
    // this.optionOrPrompt({
    //   type    : 'input',
    //   name    : 'projectName',
    //   message : 'Your project name',
    //   // default : this.appname // Default to current folder name
    // }, function (answers) {
    //   this.projectName     = answers.projectName;
    //   done();
    // }.bind(this));


    if (!this.options['skip-welcome-message']) {
      this.log(chalk.white.bgRed.bold('Welcome to Pixel2HTML Boilerplate Generator'));
    }

     var prompts = [
      {
        type    : 'input',
        name    : 'projectName',
        message : 'Your project name',
        required: true
      },
      {
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
      },
      {
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
      },
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Would you like to include jQuery?',
        default: true,
       },
       {
        type: 'confirm',
        name: 'parsley',
        message: 'Do you have forms to validate? Include Parsley!',
        when:
       },
       {
        type: 'confirm',
        name: 'modernizer',
        message: 'Do you want to add Modernizr?',
       }
    ];

    console.log(prompts);



    // this.prompt(prompts, function (answers) {


    //   this.cssPreprocessor = answers.cssPreprocessor;
    //   this.cssFramework    = answers.cssFramework;
    //   this.jquery           = answers.jquery;
    //   this.parsley          = answers.parsley;
    //   this.modernizr        = answers.modernizr;

    //   done();
    // }.bind(this));
  },


  paths: function() {
    this.paths = {
      srcFonts:    'assets/src/fonts',
      srcIcons:    'assets/src/icons',
      srcImages:   'assets/src/images',
      srcVendors:  'assets/src/vendor',
      srcJs:       'assets/src/js',
      srcCssPreprocessor: 'assets/src/'+this.cssPreprocessor
    };
  },

  writing: {

    createFolders: function() {
      this.log(chalk.yellow('Creating directories.'));

      mkdirp('assets');

      _.each(this.paths, function(path){
        mkdirp(path);
      });
    },


    gulpfile: function () {
      this.log(chalk.yellow('Copying gulpfile.'));
      this.fs.copyTpl(
        this.templatePath('gulp/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );


    },

    packageJSON: function () {
      this.log(chalk.yellow('Copying package.json file and adding dependencies.'));
      this.fs.copyTpl(
        this.templatePath('base/_package.json'),
        this.destinationPath('package.json'),
        {
          projectName    : this.projectName,
          cssPreprocessor: this.cssPreprocessor
        }
      );
    },

    jshint: function () {
      this.log(chalk.yellow('Copying jshintrc file.'));
      this.fs.copy(
        this.templatePath('base/jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    git: function () {
      this.log(chalk.yellow('Copying git files.'));
      this.fs.copy(
        this.templatePath('git/gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('git/gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    bower: function () {
      this.log(chalk.yellow('Adding some bower magic.'));

      var bowerJson = {
        projectName: 'pixel2html-'+_s.slugify(this.projectName),
        private: true,
        dependencies: {}
      };

      switch(this.cssFramework) {
        case 'bootstrap':
          switch(this.cssPreprocessor){
            case 'sass':
              bowerJson.dependencies['bootstrap-sass'] = '~3.3.*';
            break; //sass
            case 'less':
              bowerJson.dependencies['bootstrap'] = '~3.3.*';
            break; //less
            case 'stylus':
              bowerJson.dependencies['bootstrap-stylus'] = '~4.0.*';
            break; //stylus
          }
        break; //bootstrap

        case 'basscss':
          switch(this.cssPreprocessor){
            case 'sass':
              bowerJson.dependencies['basscss-sass'] = '~3.0.*';
            break; //sass

            default:
            case 'less':
            case 'stylus':
              bowerJson.dependencies['basscss'] = '~7.0.*';
            break; //less

          }
        break;

        case 'foundation':
          switch(this.cssPreprocessor){
            case 'sass':
              bowerJson.dependencies['foundation'] = '~5.5.*';
            break; //sass
            case 'less':
              bowerJson.dependencies['foundation'] = '~5.5.*';
            break; //less
            case 'stylus':
              bowerJson.dependencies['foundation'] = '~5.5.*';
            break; //stylus
          }
        break;


      }
      if (this.jquery) {
        bowerJson.dependencies['jquery'] = '~2.1.*';
      }
      if (this.parsley) {
        bowerJson.dependencies['parsleyjs'] = '~2.1.*';
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
      this.log(chalk.yellow('Copying editorconfig file.'));
      this.fs.copy(
        this.templatePath('base/editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    misc: function () {
      this.log(chalk.yellow('Copying misc files.'));
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

    styles: function () {
      var cssFile = 'main';
      switch(this.cssPreprocessor){
        case 'sass':
          cssFile += '.scss';
        break; //sass
        case 'less':
          cssFile += '.less';
        break; //less
        case 'stylus':
          cssFile += '.styl';
        break; //stylus
      }

      this.fs.copyTpl(
        this.templatePath('styles/'+cssFile),
        this.destinationPath(this.paths.srcCssPreprocessor + '/' +cssFile)
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('scripts/main.js'),
        this.destinationPath(this.paths.srcJs+'/main.js')
      );
    },

    html: function () {

      this.fs.copyTpl(
        this.templatePath('layouts/index.html'),
        this.destinationPath('index.html'),
        {
          projectName: this.projectName,
          modernizr: this.modernizr,
          cssPreprocessor: this.cssPreprocessor,
          cssFramework: this.cssFramework,
          jquery: this.jquery
        }
      );

    }
  },

  install: function () {
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {

    var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install & bower install') + '\n' +
      '\n\n Happy coding :)';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

  }
});
