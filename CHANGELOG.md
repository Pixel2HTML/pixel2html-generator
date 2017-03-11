#### 1.3.0
- Migrate to Gulp 4.
- Import reset.css only when there no selected FrontEnd Framework
- Added `production` flag to gulp tasks to speed up the compilation process on `development` mode (no mins, no compressions)
- Added CSScomb
- Added PurifyCSS
- Improvements in the PUG file structure, now it have some layouts, mixins and imports.
- Moved `sourcemaps` to a external file.
- Removed useless Gulp Plumber.
- Added some SVG magic by default.

#### 1.2.3
- Added fonts support to default gulp routine

#### 1.2.2
- Added `dist` directories configuration on `config.js` file.
- Added Zurb Foundation initializer on `main.js` file.
- Updated library versions.

#### 1.2.1
- Fixed version name

#### 1.2.0
- Added Jekyll support
- Removed vendor gulp tasks in favor of `config.js`
- Added gulp group css media queries support
- Improved bower inclusion of libs on index.js

#### 1.1.2
- Added PUG/Jade support

#### 1.1.0
- Minor bugfixing
- Removed `gitlab-ci.yml` integration
- Add generator version to config file

#### 1.0.0
- Initial release