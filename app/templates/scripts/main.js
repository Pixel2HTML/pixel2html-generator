// Welcome to our main file!
// we are using Webpack and ES6
// feel free to use imports and exports
// as well as ES6 code
// everything gets polyfilled on demand
// based on our .browserlistrc file

// Here we are importing the index file inside global
// read more about modules here:
// http://wesbos.com/javascript-modules/
import './general'

// Here's a small example using ES6
// feel free to delete everything later on
const colors = [ 'pink', 'red', 'blue' ]
const moColors = ['yellow', 'papayawhip']

const allTheColors = [ ...colors, ...moColors ]
allTheColors.map(color => console.log(`The color is ${color}`))

// Happy coding from Pixel2HTML
