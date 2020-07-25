const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

const port = 3001;
const rootPath = __dirname;

const host = 'localhost';

module.exports = merge(base, {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port,
    host,
    contentBase: path.join(rootPath, 'dist'),
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    stats: 'normal', // verbose, normal, minimal errors-only, none,
    hot: false,
    watchOptions: {
      poll: 1000
    }
  },
});
