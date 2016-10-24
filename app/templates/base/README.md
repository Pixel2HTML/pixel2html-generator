# <%= projectId %>

## Installing dependencies & running up
To work, the **Pixel2HTML Boilerplate** needs to install some dependencies to run the options you select.
For this job, run this command in your shell

```
$ npm install
$ npm run code
```

### Other available npm commands

```
$ npm run build //build the project without serving
```

## File Structure

This boilerplate will create a set of files and folders

```

├── dist/
├── src/
│    ├──  assets/
│    │    ├──  .gulp/
│    │    ├──  fonts/
│    │    ├──  icons/
│    │    ├──  images/
│    │    ├──  js/
│    │    ├──  styles/
│    │    │    ├──  components/
│    │    │    │    ├──  _buttons.<%= cssProcessor %>
│    │    │    │    ├──  _footer.<%= cssProcessor %>
│    │    │    │    ├──  _header.<%= cssProcessor %>
│    │    │    │    └──  _nav.<%= cssProcessor %>
│    │    │    ├──  screens/
│    │    │    │    ├──  _base.<%= cssProcessor %>
<% for(var i=1; i<=qtyScreens; i++) {%>│    │    │    │    └──  screen_<%=i%>.<%= cssProcessor %>
<% } %><% if (frontEndFramework) { -%>│    │    │    ├──  vendor/
│    │    │    │    ├──  <%= frontEndFramework %>/
│    │    │    │         ├──  index.scss
│    │    │    │         └──  variables.scss<% } -%>

│    │    │    ├──  _variables.<%= cssProcessor %>
│    │    │    ├──  _reset.<%= cssProcessor %>
│    │    │    ├──  _mixins.<%= cssProcessor %>
│    │    │    └──  main.<%= cssProcessor %>
│    │    └──  vendor/
<% for(var i=1; i<=qtyScreens; i++) {%>│    └──  screen_<%=i%>.<%=markupLanguage%>
<% } %>├── .bowerrc
├── .editorcofig
├── .gitattributes
├── .gitignore
├── .gitlab-ci.yml
├── .project.conf
├── bower.json
├── gulpfile.js
├── package.json
└── README.md
```



## Available Gulp Commands

### Helpers
* `$ gulp clean` Clean /dist directory

### Static Files
* `$ gulp main:static` Compile static files (images, fonts, icons)
* `$ gulp main:static:images` Move images
* `$ gulp main:static:fonts` Move fonts
* `$ gulp main:static:icons` Move icons

### Scripts
* `$ gulp main:scripts` Concat, uglify and move JS files

### Styles
* `$ gulp main:styles` Compile, concat, autoprefix, minify and move [SCSS, Less, Stylus] files

### Vendors

<% if (frontEndFramework == 'bootstrap') { -%>
#### Bootstrap

* `$ gulp vendor:bootstrap` Compile & Move all **Bootstrap** files
* `$ gulp vendor:bootstrap:styles` Compile, concat, autoprefix, minify and move **Bootstrap** files
* `$ gulp vendor:bootstrap:scripts` Concat, uglify and move **Bootstrap** JS files
* `$ gulp vendor:bootstrap:fonts` Move **Bootstrap** fonts files
<% } -%>

<% if (frontEndFramework == 'foundation') { -%>
#### Foundation

* `$ gulp vendor:foundation` Compile & Move all **Foundation** files
* `$ gulp vendor:foundation:styles` Compile, concat, autoprefix, minify and move **Foundation** files
* `$ gulp vendor:foundation:scripts` Move **Foundation** JS files
* `$ gulp vendor:foundation:fonts` Move **Foundation** fonts files
<% } -%>

<% if (frontEndFramework == 'basscss') { -%>
#### BassCss

* `$ gulp vendor:basscss` Compile & Move all **BassCss** files
* `$ gulp vendor:basscss:styles` Compile, concat, autoprefix, minify and move **BassCss** files
* `$ gulp vendor:basscss:scripts` Concat, uglify and move **BassCss** JS files
* `$ gulp vendor:basscss:fonts` Move **BassCss** fonts files
<% } -%>

### jQuery
* `$ gulp vendor:jquery` Compile & move all **jQuery** files
* `$ gulp vendor:jquery:scripts` Compile, concat, minify and move **jQuery** files

### Daemons
* `$ gulp watch` **Watch** your files and autoexecute gulp directives
* `$ gulp serve` **Watch** your files and **serve** with an HTTP server and **Sync** with your prefered browser _awesome!_

### Delivery
 * `$ gulp build` Execute all the gulp directives and makes a `.zip` file with the latest code.
