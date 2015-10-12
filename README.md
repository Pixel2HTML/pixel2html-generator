# Pixel2HTML Boilerplate Generator

[![Build Status](https://travis-ci.org/j0an/pixel2html-generator.svg?branch=master)](https://travis-ci.org/j0an/pixel2html-generator)

We aim to generate a boilerplate for projects when we know the specs.

## How to install
You will need `node` installed in your machine. In case you don't have it (you can check this typing `node -v` in your terminal) please visit [this link](https://nodejs.org/en/download/).

Now we need to install **Yeoman**, **Bower** and the **Pixel2HTML Generator**, so, run this command in your terminal. This one will install globally.
```shell
$ npm install -g yo bower generator-pixel2html
```
_voilá_

## Running the generator by yourself

To generate the **Pixel2HTML Boilerplate** go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo pixel2html <params>
```

### Available Parameters

* ```--projectName``` (*string*)
* ```--qtyScreens``` (*int*)
* ```--cssProcessor``` (*string*) [scss, less, styl, none]
* ```--frontEndFramework``` (*string*) [basscss, bootstrap, foundation]
* ```--jQuery``` (*bool*)
* ```--modules``` (*array*)


### Available config file

You can create a json file in the root directory of your project.
Here an example of it's structure

```
{
  "projectName": "XXX",
  "qtyScreens": 4,
  "cssProcessor": "less",
  "frontEndFramework": "bootstrap",
  "jQuery": true,
  "modules": [
    "animatecss"
  ],
  "generatedBy": "Pixel2HTML",
  "generatedAt": "2015-10-09T21:55:20-03:00"
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
$ npm install && bower install && gulp serve
```

## File Structure

This boilerplate will create a set of files and folders

```
/assets
      /dist
      /src
          /fonts
          /gulp
          /icons
          /images
          /js
          /styles
                /components
                      _buttons.ext
                      _footer.ext
                      _header.ext
                      _nav.ext
                /screens
                      _base.ext
                      screen_*.ext
                /vendor
                      /frontend framework [bootstrap|foundation|basscss]
                            index.scss
                            variables.scss
                main.ext
                mixins.ext
                variables.ext
          /vendor
.bowerrc
.gitattributes
.gitignore
.jshintrc
.editorcofig
.project.conf
bower.json
gulpfile.js
package.json
screen_*.html
```

## Available Gulp Commands

### Helpers
* `$ gulp clean` Clean /dist directory

### Static Files
* `$ gulp main:static` Compile static files (images, fonts, icons)
* `$ gulp main:static:images` Move & optimize images
* `$ gulp main:static:fonts` Move fonts
* `$ gulp main:static:icons` Move icons

### Scripts
* `$ gulp main:scripts` Concat, uglify and move JS files

### Styles
* `$ gulp main:styles` Compile, concat, autoprefix, minify and move [SCSS, Less, Stylus] files

### Vendors
#### Bootstrap

* `$ gulp vendor:bootstrap` Compile & Move all **Bootstrap** files
* `$ gulp vendor:bootstrap:styles` Compile, concat, autoprefix, minify and move **Bootstrap** files
* `$ gulp vendor:bootstrap:scripts` Concat, uglify and move **Bootstrap** JS files
* `$ gulp vendor:bootstrap:fonts` Move **Bootstrap** fonts files

#### Foundation
* `$ gulp vendor:foundation` Compile & Move all **Foundation** files
* `$ gulp vendor:foundation:styles` Compile, concat, autoprefix, minify and move **Foundation** files
* `$ gulp vendor:foundation:scripts` Concat, uglify and move **Foundation** JS files
* `$ gulp vendor:foundation:fonts` Move **Foundation** fonts files

#### BassCss
* `$ gulp vendor:basscss` Compile & Move all **BassCss** files
* `$ gulp vendor:basscss:styles` Compile, concat, autoprefix, minify and move **BassCss** files
* `$ gulp vendor:basscss:scripts` Concat, uglify and move **BassCss** JS files
* `$ gulp vendor:basscss:fonts` Move **BassCss** fonts files

#### jQuery
* `$ gulp vendor:jquery` Compile & move all **jQuery** files
* `$ gulp vendor:jquery:scripts` Compile, concat, minify and move **jQuery** files

### Daemons
* `$ gulp watch` Watch your files and autoexecute gulp directives
* `$ gulp serve` **Watch** your files and **serve** with an HTTP server and **Sync** with your prefered browser _awesome!_ 
