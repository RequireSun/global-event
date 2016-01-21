'use strict';

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'global-event',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
