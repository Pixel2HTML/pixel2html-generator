const baseFiles = [
  'LICENSE',
  'webpack.config.js'
]

const baseTemplates = [
  'package.json',
  'README.md',
]

const dotfiles = [
  'editorconfig',
  'gitignore',
  'gitattributes',
  'project.conf'
]

const webpack = [
  'webpack/commonPlugins.js',
  'webpack/debugPlugins.js',
  'webpack/developmentPlugins.js',
  'webpack/paths.js',
  'webpack/productionPlugins.js',
]

const gulpFiles = [
  'gulp/common/cssModulesWrite.js',
  'gulp/common/fonts.js',
  'gulp/common/scripts.js',
  'gulp/common/styles.js',
  'gulp/development/serve.js',
  'gulp/production/minifyStyles.js',
  'gulp/production/purify.js',
  'gulp/production/styles-production.js',
  'gulp/production/zip.js',
]

const gulpTemplates = [
  'gulpfile.js',
  'gulp/config.js',
  'gulp/common/markup.js',
  'gulp/common/static.js',
  'gulp/development/watch.js',
]

const scss = [
  'styles/main/components/_buttons.scss',
  'styles/main/components/_forms.scss',
  'styles/main/screens/_base.scss',
  'styles/main/_mixins.scss',
  'styles/main/_variables.scss',
  'styles/main/main.scss',
  'styles/vendor/_reset.scss',
  'styles/vendor/vendor.scss',
]

module.exports = {
  baseFiles,
  baseTemplates,
  dotfiles,
  webpack,
  gulpFiles,
  gulpTemplates,
  scss,
}
