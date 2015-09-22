# Pixel2HTML Boilerplate Generator

We aim to generate a boilerplate for projects when we know the specs.

## How to install
You will need `node` installed in your machine. In case you don't have it (you can check this typing `node -v` in your terminal) please visit [this link](https://nodejs.org/en/download/).

Now we need to install **Yeoman**, **Bower** and the **Pixel2HTML Generator**, so, run this command in your terminal. This one will install globally.
```shell
$ npm install -g yo bower generator-pixel2html
```
_voilá_

## Running the generator by yourself

To generate the *Pixel2HTML* boilerplate go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo pixel2html <params>
```
_or you can pass attributes to skip questions that you may know the answer ;)_

### Available Parameters

* ```--projectName``` (*string*)
* ```--qtyScreens``` (*int*)
* ```--projectType``` (*string*) [desktop, responsive, mobile, email]
* ```--cssProcessor``` (*string*) [scss, less, styl, none]
* ```--frontEndFramework``` (*string*) [basscss, bootstrap, foundation]
* ```--jQuery``` (*bool*)

## Installing dependencies & running up
To work, the *Pixel2HTML Boilerplate* needs to install some dependencies to run the options you select.
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
          /css preprocessor [less|scss|styl]
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
                            index.ext
                            variables.ext
                main.ext
                mixins.ext
                variables.ext
          /vendor
.bowerrc
.gitattributes
.gitignore
.jshintrc
bower.json
gulpfile.js
package.json
screen_*.html
```

## Available Gulp Commands

* `$ gulp clean` Clean /dist directory
* `$ gulp static` Compile static files (images, fonts, icons)
* `$ gulp images:main` Move & optimize images
* `$ gulp fonts:main` Move fonts
* `$ gulp icons:main` Move icons
* `$ gulp scripts:main` Concat, uglify and move JS files
* `$ gulp styles:main` Compile, concat, autoprefix, minify and move [SCSS, Less, Stylus] files

### Daemons
* `$ gulp watch` Watch your files and autoexecute gulp directives
* `$ gulp serve` **Watch** your files and **serve** with an HTTP server and **Sync** with your prefered browser _awesome!_ 
