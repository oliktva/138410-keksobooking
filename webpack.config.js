'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve('./build/js'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        unsafe: true
      }
    })
  ]
};
