const merge = require('webpack-merge');
const common = require('./webpack.config.js');

merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
});

