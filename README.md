# Pixel2HTML Boilerplate Generator 1.2.0

[![Build Status](https://travis-ci.org/Pixel2HTML/pixel2html-generator.svg?branch=master)](https://travis-ci.org/Pixel2HTML/pixel2html-generator)

We aim to generate a boilerplate for projects when we know the specs.

## How to install

You will need `node` installed in your machine. In case you don't have it (you can check this typing `node -v` in your terminal) please visit [this link](https://nodejs.org/en/download/).

We also need to install **Yeoman**, **Bower** and the **Pixel2HTML Generator**, so run this command in your terminal. The `-g` parameter is to install them globally so can use it in every project.
```shell
$ npm install -g yo bower generator-pixel2html
```
_voilá_

## Running the generator

To generate the **Pixel2HTML Boilerplate** go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo pixel2html
```

### Questions the generator will ask
* Client ID
* Project ID
* Quantity of screens
* Markup Language [HTML/Pug]
* Markup Integration [None/Jekyll]
* CSS Processor [SCSS/LESS/Stylus]
* Frontend Framework [None/Bootstrap/Foundation/BassCss]
* usage of jQuery

You also can answer this questions passing parameters to the generator command.

#### Available Parameters

* ```--clientId``` (*int*)
* ```--projectId``` (*int*)
* ```--qtyScreens``` (*int*)
* ```--markupLanguage``` (*string*) [html, pug]
* ```--markupIntegration``` (*string*) [jekyll, none]
* ```--cssProcessor``` (*string*) [scss, less, styl]
* ```--frontEndFramework``` (*string*) [basscss, bootstrap, foundation, none]
* ```--jQuery``` (*bool*)

Example:

```
$ yo pixel2html --clientId=1234 --markupLanguage='html'
```

#### Available config file

You can create a json file in the root directory of your project.
Here an example of it's structure

```
{
  "clientId": XXX,
  "projectId": XXX,
  "qtyScreens": 4,
  "markupLanguage": 'html',
  "markupIntegration": 'jekyll',
  "cssProcessor": "less",
  "frontEndFramework": "bootstrap",
  "jQuery": true
}
```

Once you created this file, run
```
$ yo pixel2html
```

## Installing dependencies & running up
To work, the **Pixel2HTML Boilerplate** needs to install some dependencies to run the options you select.
For this job, run this command in your shell

```
$ npm run start
```

## File Structure

This boilerplate will create a set of files and folders

```

├──  dist/
├──  src/
│    └──  assets/
│    ├──  fonts/
│    ├──  gulp/
│    ├──  icons/
│    ├──  images/
│    ├──  js/
│    ├──   styles/
│    │    ├──  components/
│    │    │    ├──  _buttons.ext
│    │    │    ├──  _footer.ext
│    │    │    ├──  _header.ext
│    │    │    └── _nav.ext
│    │    ├──  screens/
│    │    │    ├──  _base.ext
│    │    │    └──  screen_*.ext
│    │    ├── main.ext
│    │    ├── vendor.scss
│    │    ├── mixins.ext
│    │    └── variables.ext
│    └──  vendor/
│    └──  screen_*.[html|pug]
├──  .bowerrc
├──  .editorcofig
├──  .gitattributes
├──  .gitignore
├──  .project.conf
├──  bower.json
├──  gulpfile.js
├──  package.json
└──  README.md
```

## Available script commands.

### Start to code.
* `$ npm run code`

### Build the project
* `$ npm run build`


## Available Gulp Commands

### Helpers
* `$ gulp clean` Clean /dist directory

### Static Files
* `$ gulp main:static` Compile static files (images, icons)
* `$ gulp main:images` Move images
* `$ gulp main::icons` Move icons

### Fonts Files
* `$ gulp main:fonts` Move project fonts
* `$ gulp vendor:fonts` Move vendors fonts

### Scripts
* `$ gulp main:scripts` Concat, uglify and move project JS files
* `$ gulp vendor:scripts` Concat, uglify and move vendors JS files

### Styles
* `$ gulp main:styles` Compile, concat, autoprefix, minify and move [SCSS, Less, Stylus] project files
* `$ gulp vendor:styles` Compile, concat, autoprefix, minify and move [SCSS, Less, Stylus] vendor files

### Integration
* `$ gulp jekyll:build` Compile markup with Jekyll's partials and layouts files.

### Daemons
* `$ gulp watch` **Watch** your files and autoexecute gulp directives
* `$ gulp serve` **Watch** your files and **serve** with an HTTP server and **Sync** with your prefered browser _awesome!_

### Delivery
 * `$ gulp build` Execute all the gulp directives and makes a `.zip` file with the latest code.
