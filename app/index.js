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

var Generator = module.exports = function Generator(args, options) {

  yeoman.generators.Base.apply(this, arguments);

  this.paths = {
    'src': {
      'fonts': 'src/assets/fonts',
      'gulp': 'src/assets/.gulp',
      'icons': 'src/assets/icons',
      'images': 'src/assets/images',
      'vendors': 'src/assets/vendor',
      'scripts': 'src/assets/js',
      'styles': 'src/assets/styles',
      'html': 'src',
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
      'html': 'dist',
      'frontendframework': 'dist/assets/css/vendor',
    },
    'releases': {
      'base': 'dist/releases'
    }
  };

  //Options to set thru CLI
  this.option('projectName', {
    desc: 'Sets the project name i.e.: 3845',
    type: String,
    required: false
  });

  this.option('clientId', {
    desc: 'Sets the client id i.e.: 3845',
    type: String,
    required: false
  });

  this.option('qtyScreens', {
    desc: 'Sets the quantity of screens have the project i.e. 5 (1 homepage, 4 inners)',
    type: Number,
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
    this.options.projectName = config.projectName;
    this.options.qtyScreens = config.qtyScreens;
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

Generator.prototype.askForProjectName = function() {

  var cb = this.async();

  var projectName = this.options.projectName;

  if (projectName) {
    cb();
    return true;
  }
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
      this.options.projectName = props.projectName;
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
        value: 'css',
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
      projectName: this.options.projectName,
      cssProcessor: this.options.cssProcessor,
      frontEndFramework: this.options.frontEndFramework
    }
  );

  this.log(chalk.yellow('Copying jshintrc file.'));
  this.fs.copy(
    this.templatePath('base/jshintrc'),
    this.destinationPath('.jshintrc')
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
      projectName: this.options.projectName,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery,
      qtyScreens: this.options.qtyScreens,
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

  var bowerJson = {
    name: 'pixel2html-' + _s.slugify(this.options.clientId) + '-' + _s.slugify(this.options.projectName),
    private: true,
    dependencies: {}
  };

  switch (this.options.frontEndFramework) {
    case 'bootstrap':
      bowerJson.dependencies['bootstrap-sass'] = '^3.3.*';
      break; //bootstrap

    case 'basscss':
      bowerJson.dependencies['basscss-sass'] = '~4.0.*';
      break;

    case 'foundation':
      bowerJson.dependencies['foundation-sites'] = '~6.2.*';
      break;
  }
  if (this.options.jQuery) {
    bowerJson.dependencies['jquery'] = '~3.1.*';
  }

  this.fs.writeJSON('bower.json', bowerJson);

  this.fs.copyTpl(
    this.templatePath('bower/bowerrc'),
    this.destinationPath('.bowerrc'), {
       paths: this.paths
    }
  );
};

Generator.prototype.writeHTMLFiles = function() {

  for (var i = 1; i < this.options.qtyScreens + 1; i++) {
    this.fs.copyTpl(
      this.templatePath('html/_screen.html'),
      this.destinationPath(this.paths.src.html+'/screen_' + i + '.html'), {
        screenNumber: i,
        clientId: this.options.clientId,
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
      }
    );
  }

};

Generator.prototype.writeBaseStyles = function() {

  var cssProcessor = this.options.cssProcessor;

  this.options.cssMainFile = this.paths.src.styles + '/main.' + cssProcessor;

  this.fs.copyTpl(
    this.templatePath('styles/' + cssProcessor + '/main.' + cssProcessor),
    this.destinationPath(this.paths.src.styles + '/main.' + cssProcessor), {
      clientId: this.options.clientId,
      projectName: this.options.projectName,
      qtyScreens: this.options.qtyScreens
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
        projectName: this.options.projectName
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
      projectName: this.options.projectName
    }
  );
};

Generator.prototype.writeBaseGulpFiles = function() {

  this.log(chalk.yellow('Copying gulpfile.'));
  this.fs.copyTpl(
    this.templatePath('gulp/_gulpfile.js'),
    this.destinationPath('gulpfile.js'), {
      paths: this.paths
    }
  );

  //default
  this.fs.copyTpl(
    this.templatePath('gulp/modules/default.js'),
    this.destinationPath(this.paths.src.gulp + '/default.js'), {
      paths: this.paths,
      frontEndFramework: this.options.frontEndFramework,
      jQuery: this.options.jQuery
    }
  );

  //static
  this.fs.copyTpl(
    this.templatePath('gulp/modules/static.js'),
    this.destinationPath(this.paths.src.gulp + '/static.js'), {
      paths: this.paths
    }
  );

  //styles:main
  this.fs.copyTpl(
    this.templatePath('gulp/modules/styles.js'),
    this.destinationPath(this.paths.src.gulp + '/styles.js'), {
      cssProcessor: this.options.cssProcessor,
      cssMainFile: this.options.cssMainFile,
      paths: this.paths
    }
  );

  //scripts:main
  this.fs.copyTpl(
    this.templatePath('gulp/modules/scripts.js'),
    this.destinationPath(this.paths.src.gulp + '/scripts.js'), {
      paths: this.paths
    }
  );

  //html:main
  this.fs.copyTpl(
    this.templatePath('gulp/modules/html.js'),
    this.destinationPath(this.paths.src.gulp + '/html.js'), {
      paths: this.paths
    }
  );

  //watch
  this.fs.copyTpl(
    this.templatePath('gulp/modules/watch.js'),
    this.destinationPath(this.paths.src.gulp + '/watch.js'), {
      paths: this.paths,
      cssProcessor: this.options.cssProcessor,
      frontEndFramework: this.options.frontEndFramework
    }
  );

  //serve
  this.fs.copyTpl(
    this.templatePath('gulp/modules/serve.js'),
    this.destinationPath(this.paths.src.gulp + '/serve.js'), {
      paths: this.paths
    }
  );

  //serve
  this.fs.copyTpl(
    this.templatePath('gulp/modules/build.js'),
    this.destinationPath(this.paths.src.gulp + '/build.js'), {
      paths: this.paths,
      cssProcessor: this.options.cssProcessor,
    }
  );
};

Generator.prototype.writeFrontEndFrameworkFiles = function() {
  var cssProcessor = this.options.cssProcessor;
  var frontEndFramework = this.options.frontEndFramework;

  if (!this.options.frontEndFramework) {
    return true;
  }

  //move vendor styles
  this.fs.copy(
    this.templatePath('styles/vendor/' + frontEndFramework),
    this.destinationPath(this.paths.src.frontendframework + '/' + frontEndFramework)
  );

  //copy gulp file
  this.fs.copyTpl(
    this.templatePath('gulp/modules/vendor/' + this.options.frontEndFramework + '.js'),
    this.destinationPath(this.paths.src.gulp + '/vendor/' + this.options.frontEndFramework + '.js'), {
      frontEndFramework: this.options.frontEndFramework,
      paths: this.paths
    }
  );
};

Generator.prototype.writeJqueryGulpFiles = function() {

  if (!this.options.jQuery) {
    return true;
  }

  this.fs.copyTpl(
    this.templatePath('gulp/modules/vendor/jquery.js'),
    this.destinationPath(this.paths.src.gulp + '/vendor/jquery.js'), {
      paths: this.paths
    }
  );
}


Generator.prototype.writeGitlabCIFiles = function() {

  this.fs.copyTpl(
    this.templatePath('base/_.gitlab-ci.yml'),
    this.destinationPath('.gitlab-ci.yml'), {
      clientId: '000'+this.options.clientId,
      projectName: '000'+this.options.projectName
    }
  );
}


Generator.prototype.writeProjectConfigFile = function() {
  //overwrite the default .project.conf file or create the new one.

  var configJson = {
    "clientId": this.options.clientId,
    "projectName": this.options.projectName,
    "qtyScreens": this.options.qtyScreens,
    "cssProcessor": this.options.cssProcessor,
    "frontEndFramework": this.options.frontEndFramework,
    "jQuery": this.options.jQuery,
    "generatedBy": "Pixel2HTML",
    "generatedAt": moment().format()
  };

  this.fs.writeJSON('./.project.conf', configJson)
}
