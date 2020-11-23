const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    path: path.join(__dirname, '../demo/src'),
    filename: 'device-motions.js',
  },
});

