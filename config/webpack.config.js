const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
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
  },
};

