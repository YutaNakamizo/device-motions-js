const path = require('path');
const ESModulesWebpackPlugin = require('esmodules-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs-module',
  },
  /*module: {
    rules: [
      {
        test: /\.(c|m)?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
            plugins: [
              [
                'module:babel-root-import',
                {
                  rootPathSuffix: 'src',
                },
              ],
            ],
          },
        },
      },
    ],
  },*/
};

