const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // {
      //     enforce: 'pre',
      //     test: /\.js$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      // }
    ],
  },
};
