const Generator = require('yeoman-generator')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const _ = require('underscore')
const fs = require('fs-extra')
const moment = require('moment')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

const eslint = require('gulp-eslint')
const filter = require('gulp-filter')

class PixelGenerator extends Generator {
  constructor (args, options) {
    super(args, options)
    this.paths = {
      src: {
        gulp: 'gulp',
        gulp_tasks: 'gulp/tasks',
        fonts: 'src/assets/fonts',
        icons: 'src/assets/icons',
        images: 'src/assets/images',
        scripts: 'src/assets/js',
        styles: 'src/assets/styles',
        head: 'src/assets/head',
        markup: 'src',
        base: 'src'
      },
      dist: {
        assets: 'dist/assets',
        fonts: 'dist/assets/fonts',
        icons: 'dist/assets/icons',
        images: 'dist/assets/images',
        scripts: 'dist/assets/js',
        styles: 'dist/assets/css',
        base: 'dist',
        markup: 'dist'
      },
      releases: {
        base: 'dist/releases'
      }
    }

    this.option('projectName', {
      desc: 'Sets the Project Name',
      type: String,
      required: false
    })

    this.option('qtyScreens', {
      desc: 'Sets the quantity of screens have the project i.e. 5 (1 homepage, 4 inners)',
      type: Number,
      required: false
    })

    this.option('markupLanguage', {
      desc: 'Sets the Markup Language [html, pug]',
      type: String,
      required: false
    })

    this.option('frontEndFramework', {
      desc: 'Sets the framework of choice [bootstrap, foundation]',
      type: String,
      required: false
    })

    this.option('jQuery', {
      desc: 'Sets the usage of jQuery',
      type: String,
      required: false
    })

    this.option('yarn', {
      desc: 'Sets the usage of yarn',
      type: String,
      required: false
    })
  }

  notify () {
    updateNotifier({pkg}).notify()
  }

  readConfigFile () {
    return fs.readJson('./.project.conf')
      .then(config => {
        this.options.projectName = config.projectName
        this.options.qtyScreens = config.qtyScreens
        this.options.markupLanguage = config.markupLanguage
        this.options.frontEndFramework = config.frontEndFramework
        this.options.jQuery = config.jQuery
        this.options.yarn = config.yarn
      })
      .catch(err => {
        let okayError = err.toString() !== "Error: ENOENT: no such file or directory, open './.project.conf'"
        if (okayError) {
          this.log(chalk.cyan('There was an issue:') + '\n')
          this.log(chalk.white(err) + '\n')
        }
      })
  }

  welcome () {
    if (!this.options['skip-welcome-message']) {
      this.log('')
      this.log(chalk.cyan(' ****************************************************') + '\n')
      this.log(chalk.cyan('  Welcome to'), chalk.white.bold(' Pixel2HTML Generator '))
      this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n')
      this.log(chalk.cyan(' ****************************************************') + '\n')
    }
  }

  askForProjectName () {
    return this.options.projectName
      ? true
      : this.prompt(
        [{
          type: 'input',
          name: 'projectName',
          required: true,
          message: 'Give me the Project Name!'
        }]
      )
        .then(props => {
          this.options.projectName = props.projectName
        })
  }

  askForQtyScreens () {
    return this.options.qtyScreens
      ? true
      : this.prompt(
        [{
          type: 'input',
          name: 'qtyScreens',
          message: 'How many screens do you need to code?',
          default: 1
        }]
      )
        .then(props => {
          this.options.qtyScreens = parseInt(props.qtyScreens)
        })
  }

  askForMarkupLanguage () {
    return this.options.markupLanguage
      ? true
      : this.prompt([
        {
          type: 'list',
          name: 'markupLanguage',
          message: 'What markup lenguage/integration would you like to use? Pick one',
          choices: [
            {
              name: 'HTML',
              value: 'html'
            },
            {
              name: 'pug/jade',
              value: 'pug'
            }
          ]
        }]
      )
        .then(props => {
          this.options.markupLanguage = props.markupLanguage
        })
  }

  askForFrontEndFramework () {
    return this.options.frontEndFramework
      ? true
      : this.prompt([{
        type: 'list',
        name: 'frontEndFramework',
        message: 'What FrontEnd Framework do you like to include?',
        choices: [
          {
            name: 'None',
            value: false
          }, {
            name: 'Bootstrap 3',
            value: 'bootstrap-3'
          }, {
            name: 'Bootstrap 4',
            value: 'bootstrap-4'
          }, {
            name: 'Foundation',
            value: 'foundation'
          }]
      }])
        .then(props => {
          this.options.frontEndFramework = props.frontEndFramework
        })
  }

  askForjQuery () {
    return this.options.jQuery || this.options.frontEndFramework
      ? true
      : this.prompt([{
        type: 'confirm',
        name: 'jQuery',
        message: 'Would you like to use jQuery? \n http://youmightnotneedjquery.com/ \n http://youmightnotneedjqueryplugins.com/ \n',
        default: false
      }])
        .then(props => {
          this.options.jQuery = props.jQuery
        })
  }

  askForYarnInstall () {
    return this.options.yarn
      ? true
      : this.prompt([{
        type: 'confirm',
        name: 'yarn',
        message: 'Should I install extra dependencies needed with Yarn?',
        default: true
      }])
        .then(props => {
          this.options.yarn = props.yarn
        })
  }

  writeProjectFiles () {
    this.log(chalk.yellow('Copying package.json file and adding dependencies.'))
    this.fs.copyTpl(
      this.templatePath('base/package.json.ejs'),
      this.destinationPath('package.json'), {
        projectName: this.options.projectName,
        markupLanguage: this.options.markupLanguage,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    this.log(chalk.yellow('Copying webpack config file.'))
    this.fs.copyTpl(
      this.templatePath('base/webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    this.log(chalk.yellow('Copying tern project file.'))
    this.fs.copyTpl(
      this.templatePath('base/tern-project.json.ejs'),
      this.destinationPath('.tern-project'), {
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    this.log(chalk.yellow('Copying editorconfig file.'))
    this.fs.copy(
      this.templatePath('base/editorconfig'),
      this.destinationPath('.editorconfig')
    )

    this.log(chalk.yellow('Copying MIT License'))
    this.fs.copy(
      this.templatePath('base/LICENSE'),
      this.destinationPath('LICENSE')
    )

    this.log(chalk.yellow('Copying git files.'))
    this.fs.copyTpl(
      this.templatePath('git/gitignore'),
      this.destinationPath('.gitignore'), {
        paths: this.paths
      }
    )

    this.fs.copy(
      this.templatePath('git/gitattributes'),
      this.destinationPath('.gitattributes')
    )

    this.log(chalk.yellow('Copying README file.'))
    this.fs.copyTpl(
      this.templatePath('base/README.md.ejs'),
      this.destinationPath('README.md'), {
        paths: this.paths,
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
        qtyScreens: this.options.qtyScreens,
        markupLanguage: this.options.markupLanguage,
        now: moment().format(),
        version: pkg.version
      }
    )
  }

  createFolders () {
    this.log(chalk.yellow('Creating directories.'))

    // make src paths
    _.each(this.paths.src, function (path) {
      mkdirp(path)
    })
    _.each(this.paths.releases, function (path) {
      mkdirp(path)
    })
  }

  copyGitKeepFiles () {
    this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.releases.base + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.fonts + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.icons + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('base/gitkeep'),
      this.destinationPath(this.paths.src.images + '/.gitkeep')
    )
  }

  copySampleSvg () {
    this.fs.copy(
      this.templatePath('assets/icons/react.svg'),
      this.destinationPath(this.paths.src.icons + '/react.svg')
    )
  }

  copyHeadFiles () {
    this.fs.copy(
      this.templatePath('assets/head/favico.ico'),
      this.destinationPath(this.paths.src.head + '/favico.ico')
    )
    this.fs.copy(
      this.templatePath('assets/head/favicon.png'),
      this.destinationPath(this.paths.src.head + '/favicon.png')
    )
    this.fs.copyTpl(
      this.templatePath('assets/head/manifest.json.ejs'),
      this.destinationPath(this.paths.src.head + '/manifest.json'),
      {
        projectName: this.options.projectName
      }
    )
  }

  writeHtmlFiles () {
    if (this.options.markupLanguage === 'html') {
      for (var i = 1; i < this.options.qtyScreens + 1; i++) {
        if (i === 1) {
          this.fs.copyTpl(
            this.templatePath('markup/_screen.' + this.options.markupLanguage + '.ejs'),
            this.destinationPath(this.paths.src.markup + '/index.html'),
            {
              screenNumber: i,
              projectName: this.options.projectName,
              frontEndFramework: this.options.frontEndFramework,
              jQuery: this.options.jQuery
            }
          )
        } else {
          this.fs.copyTpl(
            this.templatePath('markup/_screen.' + this.options.markupLanguage + '.ejs'),
            this.destinationPath(this.paths.src.markup + '/screen-' + i + '.' + this.options.markupLanguage),
            {
              screenNumber: i,
              projectName: this.options.projectName,
              frontEndFramework: this.options.frontEndFramework,
              jQuery: this.options.jQuery
            }
          )
        }
      }
    }
  }

  writePugFiles () {
    if (this.options.markupLanguage === 'pug') {
      for (var i = 1; i < this.options.qtyScreens + 1; i++) {
        if (i === 1) {
          this.fs.copyTpl(
            this.templatePath('markup/pug/_screen.' + this.options.markupLanguage),
            this.destinationPath(this.paths.src.markup + '/pug/index.pug'),
            {
              screenNumber: i,
              projectName: this.options.projectName,
              clientId: this.options.clientId,
              projectId: this.options.projectId,
              frontEndFramework: this.options.frontEndFramework,
              jQuery: this.options.jQuery
            }
          )
        } else {
          this.fs.copyTpl(
            this.templatePath('markup/pug/_screen.' + this.options.markupLanguage),
            this.destinationPath(this.paths.src.markup + '/pug/screen-' + i + '.' + this.options.markupLanguage),
            {
              screenNumber: i,
              projectName: this.options.projectName,
              clientId: this.options.clientId,
              projectId: this.options.projectId,
              frontEndFramework: this.options.frontEndFramework,
              jQuery: this.options.jQuery
            }
          )
        }
      }
      this.fs.copyTpl(
        this.templatePath('markup/pug/layouts/layout-primary.pug.ejs'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/layout-primary.pug'),
        {
          screenNumber: i,
          projectName: this.options.projectName,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
      this.fs.copy(
        this.templatePath('markup/pug/layouts/general/**/*'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/general')
      )
      this.fs.copy(
        this.templatePath('markup/pug/layouts/includes/**/*'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/includes')
      )
    }
  }

  writeBaseStyles () {
    this.fs.copyTpl(
      this.templatePath('styles/main/main.scss'),
      this.destinationPath(this.paths.src.styles + '/main/main.scss'), {
        projectName: this.options.projectName,
        qtyScreens: this.options.qtyScreens
      }
    )

    this.fs.copyTpl(
      this.templatePath('styles/vendor/vendor.scss'),
      this.destinationPath(this.paths.src.styles + '/vendor/vendor.scss'), {
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework
      }
    )

    this.fs.copy(
      this.templatePath('styles/main/_variables.scss'),
      this.destinationPath(this.paths.src.styles + '/main/_variables.scss')
    )
    this.fs.copy(
      this.templatePath('styles/main/_mixins.scss'),
      this.destinationPath(this.paths.src.styles + '/main/_mixins.scss')
    )
    this.fs.copy(
      this.templatePath('styles/vendor/_reset.scss'),
      this.destinationPath(this.paths.src.styles + '/vendor/_reset.scss')
    )
    this.fs.copy(
      this.templatePath('styles/main/screens/_base.scss'),
      this.destinationPath(this.paths.src.styles + '/main/screens/_base.scss')
    )
    this.fs.copy(
      this.templatePath('styles/main/components/_forms.scss'),
      this.destinationPath(this.paths.src.styles + '/main/components/_forms.scss')
    )
    this.fs.copy(
      this.templatePath('styles/main/components/_buttons.scss'),
      this.destinationPath(this.paths.src.styles + '/main/components/_buttons.scss')
    )

    for (var i = 1; i < this.options.qtyScreens + 1; i++) {
      this.fs.copyTpl(
        this.templatePath('styles/main/screens/_screen.scss'),
        this.destinationPath(this.paths.src.styles + '/main/screens/screen_' + i + '.scss'), {
          screenNumber: i,
          projectName: this.options.projectName
        }
      )
    }
  }

  writeBaseScriptsFiles () {
    this.log(chalk.yellow('Copying js main file.'))
    this.fs.copyTpl(
      this.templatePath('scripts/app.js'),
      this.destinationPath(this.paths.src.scripts + '/app.js'), {
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework
      }
    )
    this.fs.copyTpl(
      this.templatePath('scripts/index.js.ejs'),
      this.destinationPath(this.paths.src.scripts + '/index.js'), {
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    if (this.options.frontEndFramework) {
      this.fs.copyTpl(
        this.templatePath('scripts/framework.js.ejs'),
        this.destinationPath(this.paths.src.scripts + '/framework.js'), {
          projectName: this.options.projectName,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
    }
  }

  writeBaseGulpFiles () {
    this.log(chalk.yellow('Copying gulpfile.'))
    this.fs.copyTpl(
      this.templatePath('gulp/gulpfile.js.ejs'),
      this.destinationPath('gulpfile.js'), {
        paths: this.paths,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
        markupLanguage: this.options.markupLanguage
      }
    )

    this.log(chalk.yellow('Copying gulpfile config file.'))
    this.fs.copyTpl(
      this.templatePath('gulp/config.js.ejs'),
      this.destinationPath(this.paths.src.gulp + '/config.js'), {
        paths: this.paths,
        markupLanguage: this.options.markupLanguage,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    // fonts
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/fonts.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/fonts.js'), {
        paths: this.paths
      }
    )

    // markup
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/markup.js.ejs'),
      this.destinationPath(this.paths.src.gulp_tasks + '/markup.js'), {
        paths: this.paths,
        markupLanguage: this.options.markupLanguage,
        clientId: this.options.clientId,
        projectId: this.options.projectId
      }
    )

    // scripts
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/scripts.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/scripts.js'), {
        paths: this.paths
      }
    )

    // Serve
    this.fs.copy(
      this.templatePath('gulp/tasks/serve.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/serve.js')
    )

    // watch
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/watch.js.ejs'),
      this.destinationPath(this.paths.src.gulp_tasks + '/watch.js'), {
        paths: this.paths,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
        markupLanguage: this.options.markupLanguage
      }
    )

    // static
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/static.js.ejs'),
      this.destinationPath(this.paths.src.gulp_tasks + '/static.js'), {
        paths: this.paths,
        markupLanguage: this.options.markupLanguage
      }
    )

    // styles
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/styles.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/styles.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    this.fs.copyTpl(
      this.templatePath('gulp/tasks/critical.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/critical.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    this.fs.copyTpl(
      this.templatePath('gulp/tasks/minifyStyles.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/minifyStyles.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    this.fs.copyTpl(
      this.templatePath('gulp/tasks/cssModulesWrite.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/cssModulesWrite.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    this.fs.copyTpl(
      this.templatePath('gulp/tasks/styles-production.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/styles-production.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    this.fs.copyTpl(
      this.templatePath('gulp/tasks/purify.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/purify.js'), {
        frontEndFramework: this.options.frontEndFramework,
        paths: this.paths
      }
    )

    // zip
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/zip.js'),
      this.destinationPath(this.paths.src.gulp_tasks + '/zip.js'), {
        paths: this.paths
      }
    )
  }

  writeProjectConfigFile () {
    var configJson = {
      'projectName': this.options.projectName,
      'qtyScreens': this.options.qtyScreens,
      'markupLanguage': this.options.markupLanguage,
      'frontEndFramework': this.options.frontEndFramework,
      'jQuery': this.options.jQuery,
      'generatedBy': 'Pixel2HTML',
      'generatorVersion': pkg.version,
      'generatedAt': moment().format()
    }

    this.fs.writeJSON('./.project.conf', configJson)
  }

  installDependencies () {
    this.options.yarn
      ? this.yarnInstall()
      : this.log('Skipping yarn install')
  }

  eslintJs () {
    const jsFilter = filter(['**/*.js'], { restore: true })
    this.registerTransformStream([
      jsFilter,
      eslint({
        fix: true
      }),
      eslint.format(),
      jsFilter.restore
    ])
  }
}

module.exports = PixelGenerator
