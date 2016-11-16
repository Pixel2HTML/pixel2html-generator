'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _ = require('underscore');
var util = require('util');
var path = require('path');
var wiredep = require('wiredep');
var fs = require('fs-extra');
var moment = require('moment');
var pkg = require('../package.json');

var Generator = module.exports = function Generator(args, options) {

  yeoman.generators.Base.apply(this, arguments);

  this.paths = {
    'src': {
      'fonts': 'src/assets/fonts',
      'gulp': 'src/assets/gulp',
      'gulp_tasks': 'src/assets/gulp/tasks',
      'icons': 'src/assets/icons',
      'images': 'src/assets/images',
      'vendors': 'src/assets/vendor',
      'scripts': 'src/assets/js',
      'styles': 'src/assets/styles',
      'markup': 'src',
      'frontendframework': 'src/assets/styles/vendor',
    },
    'dist': {
      'assets': 'dist/assets',
      'fonts': 'dist/assets/fonts',
      'icons': 'dist/assets/icons',
      'images': 'dist/assets/images',
      'scripts': 'dist/assets/js',
      'styles': 'dist/assets/css',
      'base': 'dist',
      'markup': 'dist',
      'frontendframework': 'dist/assets/css/vendor',
    },
    'releases': {
      'base': 'dist/releases'
    }
  };

  //Options to set thru CLI
  this.option('projectId', {
    desc: 'Sets the project id i.e.: 3845',
    type: Number,
    required: false
  });

  this.option('clientId', {
    desc: 'Sets the client id i.e.: 3845',
    type: Number,
    required: false
  });

  this.option('qtyScreens', {
    desc: 'Sets the quantity of screens have the project i.e. 5 (1 homepage, 4 inners)',
    type: Number,
    required: false
  });

  this.option('markupLanguage', {
    desc: 'Sets the Markup Language/Integration [html, pug, jekyll]',
    type: String,
    required: false
  });

  this.option('cssProcessor', {
    desc: 'Sets the CSS Preprocessor [scss, less, styl, none]',
    type: String,
    required: false
  });

  this.option('frontEndFramework', {
    desc: 'Sets the framework of choice [basscss, bootstrap, foundation]',
    type: String,
    required: false
  });

  this.option('jQuery', {
    desc: 'Sets de the usage of jQuery',
    type: String,
    required: false
  });

};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.readConfigFile = function() {
  var cb = this.async();

  fs.readJson('./.project.conf', function(err, config) {
    if (err) {
      cb();
      return true;
    }

    this.options.clientId = config.clientId;
    this.options.projectId = config.projectId;
    this.options.qtyScreens = config.qtyScreens;
    this.options.markupLanguage = config.markupLanguage;
    this.options.cssProcessor = config.cssProcessor;
    this.options.frontEndFramework = config.frontEndFramework;
    this.options.jQuery = config.jQuery;

    cb();
  }.bind(this));

}

Generator.prototype.welcome = function() {
  if (!this.options['skip-welcome-message']) {
    this.log('');
    this.log(chalk.cyan(' ****************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bold(' Pixel2HTML Generator '));
    this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
    this.log(chalk.cyan(' ****************************************************') + '\n');
  }
};

Generator.prototype.askForClientId = function() {

  var cb = this.async();

  var clientId = this.options.clientId;

  if (clientId) {
    cb();
    return true;
  }
  this.prompt(
    [{
      type: 'input',
      name: 'clientId',
      required: true,
      message: 'Give me the Client ID!',
      when: function() {
        return !clientId;
      }
    }],
    function(props) {
      this.options.clientId = props.clientId;
      cb();
    }.bind(this)
  );
};

Generator.prototype.askForProjectId = function() {

  var cb = this.async();

  var projectId = this.options.projectId;

  if (projectId) {
    cb();
    return true;
  }
  this.prompt(
    [{
      type: 'input',
      name: 'projectId',
      required: true,
      message: 'Give me the Project ID!',
      when: function() {
        return !projectId;
      }
    }],
    function(props) {
      this.options.projectId = props.projectId;
      cb();
    }.bind(this)
  );
};

Generator.prototype.askForQtyScreens = function() {

  var cb = this.async();
  var qtyScreens = this.options.qtyScreens;

  if (qtyScreens) {
    cb();
    return true;
  }


  this.prompt(
    [{
      type: 'input',
      name: 'qtyScreens',
      message: 'How many screens do you need to code?',
      default: 1,
      when: function() {
        return !qtyScreens;
      }
    }],
    function(props) {
      this.options.qtyScreens = parseInt(props.qtyScreens);
      cb();
    }.bind(this)
  );
};

Generator.prototype.askForMarkupLanguage = function() {

  var cb = this.async();
  var markupLanguage = this.options.markupLanguage

  if (markupLanguage) {
    cb();
    return true;
  }

  this.prompt([{
      type: 'list',
      name: 'markupLanguage',
      message: 'What markup lenguage/integration would you like to use? Pick one',
      choices: [{
        name: 'HTML',
        value: 'html',
      }, {
        name: 'pug/jade',
        value: 'pug',
      },
      {
        name: 'Jekyll',
        value: 'jekyll'
      }],
      when: function() {
        return !markupLanguage;
      }
    }],
    function(props) {
      this.options.markupLanguage = props.markupLanguage;
      cb();
    }.bind(this));
};

Generator.prototype.askForCssProcessor = function() {

  var cb = this.async();
  var cssProcessor = this.options.cssProcessor

  if (cssProcessor) {
    cb();
    return true;
  }

  this.prompt([{
      type: 'list',
      name: 'cssProcessor',
      message: 'What preprocessor would you like to use? Pick one',
      choices: [{
        name: 'Sass',
        value: 'scss',
      }, {
        name: 'Less',
        value: 'less',
      }, {
        name: 'Stylus',
        value: 'styl',
      }, {
        name: 'None',
        value: false,
      }],
      when: function() {
        return !cssProcessor;
      }
    }],
    function(props) {
      this.options.cssProcessor = props.cssProcessor;
      cb();
    }.bind(this));
};

Generator.prototype.askForFrontEndFramework = function() {

  var cb = this.async();
  var frontEndFramework = this.options.frontEndFramework;

  if (frontEndFramework) {
    cb();
    return true;
  }

  this.prompt([{
      type: 'list',
      name: 'frontEndFramework',
      message: 'What FrontEnd Framework do you like to include?',
      choices: [
      {
        name: 'None',
        value: false,
      },{
        name: 'Bootstrap',
        value: 'bootstrap',
      },{
        name: 'Foundation',
        value: 'foundation',
      },{
        name: 'BassCss',
        value: 'basscss',
      }],
      when: function() {
        return !frontEndFramework;
      }
    }],
    function(props) {
      this.options.frontEndFramework = props.frontEndFramework;
      cb();
    }.bind(this));
};

Generator.prototype.askForjQuery = function() {
  var cb = this.async();
  var jQuery = this.options.jQuery;

  if (jQuery) {
    cb();
    return true;
  }

  this.prompt([{
    type: 'confirm',
    name: 'jQuery',
    message: 'Would you like to use jQuery?',
    default: true,
    when: function() {
      return !jQuery;
    }
  }], function(props) {
    this.options.jQuery = props.jQuery;
    cb();
  }.bind(this));
};

Generator.prototype.writeProjectFiles = function() {

  this.log(chalk.yellow('Copying package.json file and adding dependencies.'));
  this.fs.copyTpl(
    this.templatePath('base/_package.json'),
    this.destinationPath('package.json'), {
      clientId: this.options.clientId,
      projectId: this.options.projectId,
      markupLanguage: this.options.markupLanguage,
      cssProcessor: this.options.cssProcessor,
      frontEndFramework: this.options.frontEndFramework
    }
  );

  this.log(chalk.yellow('Copying editorconfig file.'));
  this.fs.copy(
    this.templatePath('base/editorconfig'),
    this.destinationPath('.editorconfig')
  );

  this.log(chalk.yellow('Copying git files.'));
  this.fs.copyTpl(
    this.templatePath('git/gitignore'),
    this.destinationPath('.gitignore'), {
      paths: this.paths
    }
  );

  this.fs.copy(
    this.templatePath('git/gitattributes'),
    this.destinationPath('.gitattributes')
  );

  this.log(chalk.yellow('Copying README file.'));
  this.fs.copyTpl(
    this.templatePath('base/README.md'),
    this.destinationPath('README.md'), {
      paths: this.paths,
      projectId: this.options.projectId,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery,
      qtyScreens: this.options.qtyScreens,
      markupLanguage: this.options.markupLanguage,
      cssProcessor: this.options.cssProcessor
    }
  );
};

Generator.prototype.createFolders = function() {
  this.log(chalk.yellow('Creating directories.'));

  //make src paths
  _.each(this.paths.src, function(path) {
    mkdirp(path);
  });
  _.each(this.paths.releases, function(path) {
    mkdirp(path);
  });
};

Generator.prototype.copyGitKeepFiles = function() {

   this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.releases.base+'/.gitkeep')
   );
   this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.fonts+'/.gitkeep')
   );
   this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.icons+'/.gitkeep')
   );
    this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.images+'/.gitkeep')
   );

}

Generator.prototype.writeBaseBowerFile = function() {

  this.fs.copyTpl(
    this.templatePath('bower/_bower.json'),
    this.destinationPath('bower.json'), {
      clientId: this.options.clientId,
      projectId: this.options.projectId,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery
    }
  );

  this.fs.copyTpl(
    this.templatePath('bower/bowerrc'),
    this.destinationPath('.bowerrc'), {
       paths: this.paths
    }
  );
};

Generator.prototype.writeMarkupFiles = function() {

  if(this.options.markupLanguage == 'jekyll'){
    var markupLanguage = 'html';
  } else {
    var markupLanguage = this.options.markupLanguage;
  }
  for (var i = 1; i < this.options.qtyScreens + 1; i++) {
    this.fs.copyTpl(
      this.templatePath('markup/_screen.'+markupLanguage),
      this.destinationPath(this.paths.src.markup+'/screen_' + i + '.'+markupLanguage), {
        screenNumber: i,
        clientId: this.options.clientId,
        projectId: this.options.projectId,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
      }
    );
  }

};

Generator.prototype.writeBaseStyles = function() {

  var cssProcessor = this.options.cssProcessor;
  if(cssProcessor){
    this.options.cssMainFile = this.paths.src.styles + '/main.' + cssProcessor;
    this.options.cssVendorFile = this.paths.src.styles + '/vendor.scss'

    this.fs.copyTpl(
      this.templatePath('styles/' + cssProcessor + '/main.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/main.' + cssProcessor), {
        clientId: this.options.clientId,
        projectId: this.options.projectId,
        qtyScreens: this.options.qtyScreens
      }
    );

    this.fs.copyTpl(
      this.templatePath('styles/scss/vendor.scss'),
      this.destinationPath(this.paths.src.styles + '/vendor.scss'), {
        clientId: this.options.clientId,
        projectId: this.options.projectId,
        frontEndFramework: this.options.frontEndFramework,
      }
    );

    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/_variables.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/_variables.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/_mixins.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/_mixins.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/_reset.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/_reset.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/screens/_base.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/screens/_base.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/components/_header.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/components/_header.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/components/_footer.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/components/_footer.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/components/_nav.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/components/_nav.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/components/_forms.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/components/_forms.' + cssProcessor)
    );
    this.fs.copy(
      this.templatePath('styles/' + cssProcessor + '/components/_buttons.' + cssProcessor),
      this.destinationPath(this.paths.src.styles + '/components/_buttons.' + cssProcessor)
    );

    for (var i = 1; i < this.options.qtyScreens + 1; i++) {
      this.fs.copyTpl(
        this.templatePath('styles/' + cssProcessor + '/screens/_screen.' + cssProcessor),
        this.destinationPath(this.paths.src.styles + '/screens/screen_' + i + '.' + cssProcessor), {
          screenNumber: i,
          clientId: this.options.clientId,
          projectId: this.options.projectId
        }
      );
    }
  } else {
    this.options.cssMainFile = this.paths.src.styles + '/main.css';
    this.fs.copyTpl(
      this.templatePath('styles/css/main.css'),
      this.destinationPath(this.paths.src.styles + '/main.css'),{
        clientId: this.options.clientId,
        projectId: this.options.projectId,
      }
    );
  }


};

Generator.prototype.writeBaseScriptsFiles = function() {

  this.log(chalk.yellow('Copying js main file.'));
  this.fs.copyTpl(
    this.templatePath('scripts/main.js'),
    this.destinationPath(this.paths.src.scripts + '/main.js'), {
      clientId: this.options.clientId,
      projectId: this.options.projectId
    }
  );
};

Generator.prototype.writeBaseGulpFiles = function() {

  this.log(chalk.yellow('Copying gulpfile.'));
  this.fs.copyTpl(
    this.templatePath('gulp/_gulpfile.js'),
    this.destinationPath('gulpfile.js'), {
      paths: this.paths,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery
    }
  );

  this.log(chalk.yellow('Copying gulpfile config file.'));
  this.fs.copyTpl(
    this.templatePath('gulp/_config.js'),
    this.destinationPath(this.paths.src.gulp+'/config.js'), {
      paths: this.paths,
      cssProcessor: this.options.cssProcessor,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery
    }
  );

  this.log(chalk.yellow('Copying gulpfile helpers file.'));
  this.fs.copyTpl(
    this.templatePath('gulp/_helpers.js'),
    this.destinationPath(this.paths.src.gulp+'/helpers.js'), {
      paths: this.paths
    }
  );

  //default
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/default.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/default.js'), {
      paths: this.paths,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery
    }
  );

  //static
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/static.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/static.js'), {
      paths: this.paths
    }
  );

  //main:fonts
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/fonts.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/fonts.js'), {
      paths: this.paths
    }
  );

  //main:styles
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/styles.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/styles.js'), {
      cssProcessor: this.options.cssProcessor,
      frontEndFramework: this.options.frontEndFramework,
      cssMainFile: this.options.cssMainFile,
      cssVendorFile: this.options.cssVendorFile,
      paths: this.paths
    }
  );

  //main:scripts
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/scripts.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/scripts.js'), {
      paths: this.paths
    }
  );

  //main:markup
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/markup.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/markup.js'), {
      paths: this.paths,
      markupLanguage: this.options.markupLanguage
    }
  );

  //watch
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/watch.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/watch.js'), {
      paths: this.paths,
      cssProcessor: this.options.cssProcessor,
      markupLanguage: this.options.markupLanguage,
      frontEndFramework: this.options.frontEndFramework
    }
  );

  //serve
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/serve.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/serve.js'), {
      paths: this.paths
    }
  );

  //build
  this.fs.copyTpl(
    this.templatePath('gulp/tasks/build.js'),
    this.destinationPath(this.paths.src.gulp_tasks + '/build.js'), {
      paths: this.paths,
      cssProcessor: this.options.cssProcessor,
    }
  );
};


Generator.prototype.writeProjectConfigFile = function() {
  //overwrite the default .project.conf file or create the new one.

  var configJson = {
    "clientId": this.options.clientId,
    "projectId": this.options.projectId,
    "qtyScreens": this.options.qtyScreens,
    "markupLanguage": this.options.markupLanguage,
    "cssProcessor": this.options.cssProcessor,
    "frontEndFramework": this.options.frontEndFramework,
    "jQuery": this.options.jQuery,
    "generatedBy": "Pixel2HTML",
    "generatorVersion": pkg.version,
    "generatedAt": moment().format()
  };

  this.fs.writeJSON('./.project.conf', configJson)
}
