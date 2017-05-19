# Pixel2HTML Boilerplate Generator 1.3.2

[![Build Status](https://travis-ci.org/Pixel2HTML/pixel2html-generator.svg?branch=master)](https://travis-ci.org/Pixel2HTML/pixel2html-generator)

We aim to generate a boilerplate code for projects when we know the specs. 💕

## How to install

#### Node

You will need `node` installed in your machine. In case you don't have it (you can check this typing `node --version` in your terminal) please visit [this link](https://nodejs.org/en/download/).

We also need to install **Yeoman**, and the **Pixel2HTML Generator**, so run this command in your terminal. The `-g` parameter is to install them globally so can use it in every project.
```shell
$ npm install -g yo generator-pixel2html
```

#### Ruby

If you plan is generate a site with **Jekyll** you also need `Ruby` and `Bundler` up & running.

You can check if **Ruby** is installed running `ruby --version`
We recommend to use the latest stable version (2.3.2). If you need more information please check on [ruby official site](http://rubylang.com) or [rvm](rvm.io) to handle multiple versions of Ruby.

Also, for **Bundler**, run `gem install bundler` when `Ruby` is already installed and running.


## Running the generator

### Option 1: Answer questions
To generate the **Pixel2HTML Boilerplate** go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo pixel2html
```
The **Pixel2HTML Boilerplate** will ask you questions about this points. Answering with the desired options will generate the code.

* Client ID?
* Project ID?
* Quantity of screens?
* Markup Language? _Options: HTML/Pug_
* Markup Integration? _Options: None/Jekyll_
* CSS Processor? _Options: SCSS/LESS/Stylus_
* Frontend Framework _Options: None/Bootstrap/Foundation/BassCss_
* jQuery? _Options: true/false_


### Option 2: Using available parameters

You also can answer this questions passing parameters to the generator command.

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

### Option 3: Using the config file

You can create a `.json` file in the root directory of your project.
Here an example of it's structure:

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
├──  gulp/
├──  src/
│    └──  assets/
│    │    ├──  fonts/
│    │    ├──  icons/
│    │    ├──  images/
│    │    ├──  js/
│    │    ├──  styles/
│    │    │    ├──  components/
│    │    │    │    ├──  _buttons.ext
│    │    │    │    ├──  _footer.ext
│    │    │    │    ├──  _header.ext
│    │    │    │    └── _nav.ext
│    │    │    ├──  screens/
│    │    │    │    ├──  _base.ext
│    │    │    │    └──  screen_*.ext
│    │    │    ├── main.ext
│    │    │    ├── vendor.scss
│    │    │    ├── mixins.ext
│    │    │    └── variables.ext
│    └──  screen_*.[html|pug]
├──  .editorcofig
├──  .gitattributes
├──  .gitignore
├──  .project.conf
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
