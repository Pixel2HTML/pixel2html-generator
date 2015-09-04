'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('underscore');
var util = require('util');
var path = require('path');
var wiredep = require('wiredep');
var fs = require('fs');

var Generator = module.exports = function Generator(args, options) {

  yeoman.generators.Base.apply(this, arguments);

  this.paths = {
    src:        'assets/src',
    srcFonts:   'assets/src/fonts',
    srcIcons:   'assets/src/icons',
    srcImages:  'assets/src/images',
    srcVendors: 'assets/src/vendor',
    srcJs:      'assets/src/js'
  };


  this.destinationRoot('demo');

  //Options to set thru CLI
  this.option('projectName', {
    desc: 'Sets the project name i.e.: 3845',
    type: String,
    required: false
  });

  this.option('qtyPages', {
    desc: 'Sets the quantity of pages have the project i.e. 5 (1 homepage, 4 inners)',
    type: Number,
    required: false
  });

  this.option('projectType', {
    desc: 'Sets the type of project [desktop, responsive, mobile, email]',
    type: String,
    required: false
  });

  this.option('cssProcessor', {
    desc: 'Sets the CSS Preprocessor [sass, less, stylus, none]',
    type: String,
    required: false
  });

  this.option('frontEndFramework', {
    desc: 'Sets the framework of choice [basscss, bootstrap, foundation]',
    type: String,
    required: false
  });

  this.option('jQuery', {
    desc: 'Sets the usage of Font Awesome',
    type: String,
    required: false
  });

  this.option('fontAwesome', {
    desc: 'Sets the usage of Font Awesome',
    type: String,
    required: false
  });
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

Generator.prototype.askForProjectName = function askForProjectName() {

  var cb = this.async();
  var projectName = this.options.projectName;

  this.prompt(
    [{
      type: 'input',
      name: 'projectName',
      required: true,
      message: 'Give me the Project Name!',
      when: function() {
        return !projectName;
      }
    }],
    function(props) {
      this.projectName = props.projectName;
      cb();
    }.bind(this)
  );
};

Generator.prototype.askForQtyPages = function askForQtyPages() {

  var cb = this.async();
  var qtyPages = this.options.qtyPages;

  this.prompt(
    [{
      type: 'input',
      name: 'qtyPages',
      message: 'How many pages to will code?',
      default: 1,
      when: function() {
        return !qtyPages;
      }
    }],
    function(props) {
      this.qtyPages = props.qtyPages;
      this.homePageQty = 1;
      this.innerPagesQty = this.qtyPages - 1;

      cb();
    }.bind(this)
  );

};

Generator.prototype.projectType = function projectType() {

  var cb = this.async();
  var projectType = this.options.projectType;


  this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What type of page you will code? Pick one',
      choices: [{
        name: 'Desktop',
        value: 'desktop',
      }, {
        name: 'Responsive',
        value: 'responsive',
      }, {
        name: 'Mobile',
        value: 'mobile',
      }, {
        name: 'Email Template',
        value: 'email',
      }],
      when: function() {
        return !projectType;
      }
    }],
    function(props) {
      this.projectType = props.projectType;
      cb();
    }.bind(this));
};

Generator.prototype.askForCssProcessor = function askForCssProcessor() {

  var cb = this.async();
  var cssProcessor = this.options.cssProcessor

  this.prompt([{
      type: 'list',
      name: 'cssProcessor',
      message: 'What preprocessor would you like to use? Pick one',
      choices: [{
        name: 'Sass',
        value: 'sass',
      }, {
        name: 'Less',
        value: 'less',
      }, {
        name: 'Stylus',
        value: 'stylus',
      }, {
        name: 'None',
        value: 'css',
      }],
      when: function() {
        return !cssProcessor;
      }
    }],
    function(props) {
      this.cssProcessor = props.cssProcessor;
      cb();
    }.bind(this));
};

Generator.prototype.askForFrontFramework = function askForFrontFramework() {

  var cb = this.async();
  var frontEndFramework = this.options.frontEndFramework;

  this.prompt([{
      type: 'list',
      name: 'frontEndFramework',
      message: 'What FrontEnd Framework do you like to include?',
      choices: [{
        name: 'BassCss',
        value: 'basscss',
      }, {
        name: 'Bootstrap',
        value: 'bootstrap',
      }, {
        name: 'Foundation',
        value: 'foundation',
      }, {
        name: 'None',
        value: false,
      }],
      when: function() {
        return !frontEndFramework;
      }
    }],
    function(props) {
      this.frontEndFramework = props.frontEndFramework;
      cb();
    }.bind(this));
};

Generator.prototype.askForFontAwesome = function askForFontAwesome() {
  var cb = this.async();
  var fontAwesome = this.fontAwesome;

  this.prompt([{
    type: 'confirm',
    name: 'fontAwesome',
    message: 'Would you like to add Font Awesome?',
    default: false,
    when: function() {
      return !fontAwesome
    }
  }], function(props) {
    this.fontAwesome = props.fontAwesome;

    cb();
  }.bind(this));
};

Generator.prototype.askForjQuery = function askForjQuery() {
  var cb = this.async();
  var frontEndFramework = this.frontEndFramework;
  var jquery = this.jquery;

  this.prompt([{
    type: 'confirm',
    name: 'jquery',
    message: 'Would you like to use jQuery?',
    default: true,
    when: function() {
      return !frontEndFramework && !jquery;
    }
  }], function(props) {
    this.jquery = props.jquery;
    if (typeof this.jquery === 'undefined') {
      this.jquery = true;
    }
    cb();
  }.bind(this));
};

Generator.prototype.askForJsModules = function askForJsModules() {
  var cb = this.async();
  var jquery = this.jquery;

  var prompts = [{
    type: 'checkbox',
    name: 'jsModules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'parsleyjs',
      name: 'Form validation with Parsley.js',
      checked: true
    }, {
      value: 'modernizr',
      name: 'Add modernizr.js',
      checked: true
    }, {
      value: 'slider',
      name: 'Add Slider.js',
      checked: false
    }, {
      value: 'tabs',
      name: 'Add Tabs.js',
      checked: false
    }, {
      value: 'masonry',
      name: 'Add Masonry',
      checked: false
    }],
    when: function(jquery) {
      return jquery;
    }
  }];

  this.prompt(prompts, function(props) {

    var hasMod = function(mod) {
      return _.contains(props.jsModules, mod);
    };

    this.parsleyjs = hasMod('parsleyjs');
    this.slider = hasMod('slider');
    this.tabs = hasMod('tabs');
    this.modernizr = hasMod('modernizr');
    this.masonry = hasMod('masonry');

    cb();
  }.bind(this));
};

Generator.prototype.writeProjectFiles = function writeProjectFiles() {

  this.log(chalk.yellow('Copying package.json file and adding dependencies.'));
  this.fs.copyTpl(
    this.templatePath('base/_package.json'),
    this.destinationPath('package.json'), {
      projectName: this.projectName,
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

Generator.prototype.writeGulpFiles = function writeGulpFiles() {

  this.log(chalk.yellow('Copying gulpfile.'));
  this.fs.copyTpl(
    this.templatePath('gulp/_gulpfile.js'),
    this.destinationPath('gulpfile.js')
  );
};

Generator.prototype.createFolders = function createFolders() {
  this.log(chalk.yellow('Creating directories.'));

  mkdirp('assets');

  _.each(this.paths, function(path) {
    mkdirp(path);
  });
};

Generator.prototype.writeBowerFile = function writeBowerFile() {

  var bowerJson = {
    projectName: 'pixel2html-' + _s.slugify(this.projectName),
    private: true,
    dependencies: {}
  };

  switch (this.frontEndFramework) {
    case 'bootstrap':
      switch (this.cssProcessor) {
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
      switch (this.cssProcessor) {
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
      switch (this.cssProcessor) {
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
  if (this.jQuery) {
    bowerJson.dependencies['jquery'] = '~2.1.*';
  }
  if (this.fontAwesome) {
    bowerJson.dependencies['font-awesome'] = '~4.4.*';
  }
  if (this.parsley) {
    bowerJson.dependencies['parsleyjs'] = '~2.1.*';
  }
  if (this.modernizr) {
    bowerJson.dependencies['modernizr'] = '~2.8.*';
  }

  this.fs.writeJSON('bower.json', bowerJson);

  this.fs.copy(
    this.templatePath('bower/bowerrc'),
    this.destinationPath('.bowerrc')
  );

};

Generator.prototype.writeStyles = function writeStyles() {
  var fileExt;
  var cssProcessor = this.cssProcessor;
  var srcAssets = 'assets/src/' + cssProcessor;


  switch (this.cssProcessor) {
    case 'sass':
      fileExt = '.scss';
      break;
    case 'less':
      fileExt = '.less';
      break;
    case 'stylus':
      fileExt = '.styl';
      break;
    default:
      fileExt = '.css';
      break;
  }

  this.fs.copyTpl(
    this.templatePath('styles/' + cssProcessor + '/main' + fileExt),
    this.destinationPath(srcAssets + '/main' + fileExt), {
      projectName: this.projectName
    }
  );

  mkdirp(srcAssets + '/pages');
  mkdirp(srcAssets + '/components');


  this.fs.copy(
    this.templatePath('styles/' + cssProcessor + '/components/_header' + fileExt),
    this.destinationPath(srcAssets + '/components/_header' + fileExt)
  );
  this.fs.copy(
    this.templatePath('styles/' + cssProcessor + '/components/_footer' + fileExt),
    this.destinationPath(srcAssets + '/components/_footer' + fileExt)
  );
  this.fs.copy(
    this.templatePath('styles/' + cssProcessor + '/components/_nav' + fileExt),
    this.destinationPath(srcAssets + '/components/_nav' + fileExt)
  );
  this.fs.copy(
    this.templatePath('styles/' + cssProcessor + '/components/_buttons' + fileExt),
    this.destinationPath(srcAssets + '/components/_buttons' + fileExt)
  );


  _(this.homePageQty).times(function(n) {
    fs.writeFile(srcAssets + '/pages/home' + fileExt, '// home' + fileExt);
  });

  _(this.innerPagesQty).times(function(n) {
    fs.writeFile(srcAssets + '/pages/inner_' + n+1 + fileExt, '// inner_'+ n+1 + fileExt);
  });

}


//     scripts: function () {
//       this.fs.copy(
//         this.templatePath('scripts/main.js'),
//         this.destinationPath(this.paths.srcJs+'/main.js')
//       );
//     },

//     html: function () {

//       this.fs.copyTpl(
//         this.templatePath('layouts/index.html'),
//         this.destinationPath('index.html'),
//         {
//           projectName: this.projectName,
//           modernizr: this.modernizr,
//           cssPreprocessor: this.cssPreprocessor,
//           cssFramework: this.cssFramework,
//           jquery: this.jquery
//         }
//       );

//     }
//   },


// Generator.prototype.installDependencies = function installDependencies() {
//   var howToInstall =
//     '\nAfter running `npm install & bower install`, inject your front end dependencies into' +
//     '\nyour HTML by running:' +
//     '\n' +
//     chalk.yellow.bold('\n  gulp wiredep');

//   if (this.options['skip-install']) {
//     console.log(howToInstall);
//     return;
//   }

//   var done = this.async();
//   this.installDependencies({
//     skipMessage: this.options['skip-install-message'],
//     skipInstall: this.options['skip-install'],
//     callback: function() {
//       var bowerJson = JSON.parse(fs.readFileSync('./bower.json'));

//       // wire Bower packages to .html
//       wiredep({
//         bowerJson: bowerJson,
//         directory: 'app/bower_components',
//         exclude: ['bootstrap-sass'],
//         src: 'app/layouts/index.html'
//       });

//       done();
//     }.bind(this)
//   });
// };
