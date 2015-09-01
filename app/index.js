'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('underscore');

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
    this.fs.delete('demo');
    mkdirp('demo');
    this.destinationRoot('demo');

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
       },
       {
        type: 'confirm',
        name: 'modernizer',
        message: 'Do you want to add Modernizr?',
       }
    ];

    this.prompt(prompts, function (answers) {

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
    this.paths = {
      src_fonts:    "assets/src/fonts",
      src_icons:    "assets/src/icons",
      src_images:   "assets/src/images",
      src_vendors:  "assets/src/vendor",
      src_js:       "assets/src/js",
      src_css_preprocessor: "assets/src/"+this.css_preprocessor
    };
  },

  writing: {

    createFolders: function() {
      console.log(chalk.yellow('Creating directories.'));

      mkdirp("assets");

      _.each(this.paths, function(path){
        mkdirp(path);
      });
    },


    gulpfile: function () {
      console.log(chalk.yellow('Copying gulpfile.'));
      this.fs.copyTpl(
        this.templatePath('gulp/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );


    },

    packageJSON: function () {
      console.log(chalk.yellow('Copying package.json file and adding dependencies.'));
      this.fs.copyTpl(
        this.templatePath('base/_package.json'),
        this.destinationPath('package.json'),
        {
          project_name    : this.project_name,
          css_preprocessor: this.css_preprocessor
        }
      );
    },

    jshint: function () {
      console.log(chalk.yellow('Copying jshintrc file.'));
      this.fs.copy(
        this.templatePath('base/jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    git: function () {
      console.log(chalk.yellow('Copying git files.'));
      this.fs.copy(
        this.templatePath('git/gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('git/gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    bower: function () {
      console.log(chalk.yellow('Adding some bower magic.'));

      var bowerJson = {
        prooject_name: 'pixel2html-'+_s.slugify(this.project_name),
        private: true,
        dependencies: {}
      };

      switch(this.css_framework) {
        case 'bootstrap':
          switch(this.css_preprocessor){
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
          switch(this.css_preprocessor){
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
          switch(this.css_preprocessor){
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
      console.log(chalk.yellow('Copying editorconfig file.'));
      this.fs.copy(
        this.templatePath('base/editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    misc: function () {
      console.log(chalk.yellow('Copying misc files.'));
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
      var css_file = 'main';
      switch(this.css_preprocessor){
        case 'sass':
          css_file += '.scss';
        break; //sass
        case 'less':
          css_file += '.less';
        break; //less
        case 'stylus':
          css_file += '.styl';
        break; //stylus
      }

      this.fs.copyTpl(
        this.templatePath('styles/'+css_file),
        this.destinationPath(this.paths.src_css_preprocessor + '/' +css_file)
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('scripts/main.js'),
        this.destinationPath(this.paths.src_js+'/main.js')
      );
    },

    html: function () {
      var bsPath;

      // path prefix for Bootstrap JS files
      if (this.includeBootstrap) {
        bsPath = this.paths.src_vendor;

        if (this.css_preprocessor ==='sass') {
          bsPath += 'bootstrap-sass/assets/javascripts/bootstrap/';
        } else {
          bsPath += 'bootstrap/js/';
        }
      }

      this.fs.copyTpl(
        this.templatePath('layouts/index.html'),
        this.destinationPath('index.html'),
        {
          project_name: this.project_name,
          modernizr: this.modernizr,
          css_preprocessor: this.css_preprocessor,
          css_framework: this.css_framework,
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
      chalk.yellow.bold('npm install & bower install') + '\n'
      + '\n\n Happy coding :)';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

  }
});
