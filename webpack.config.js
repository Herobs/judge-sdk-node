const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'lib', 'index.js'),

  output: {
    filename: 'index.js'
  },

  target: 'node',

  node: {
    __dirname: false,
    __filename: false
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }],
  },

  externals: [function(context, request, callback) {
    if(/^\w+/.test(request))
      return callback(null, "commonjs " + request);
    callback();
  }]
};
