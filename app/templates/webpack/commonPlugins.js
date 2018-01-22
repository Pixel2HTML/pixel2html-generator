const webpack = require('webpack')

let common = [
  // Split vendor packages coming from npm
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  // Allow everyone to use jQuery like it was global
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    // Popper is for Bootstrap 4 mainly
    Popper: ['popper.js', 'default']
  }),
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

module.exports = common
