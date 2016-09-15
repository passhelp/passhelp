const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    template: 'web/template.ejs',
    inject: false,
    cache: false,
  }),
];

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

module.exports = {
  entry: './web/app.ts',
  output: {
    path: './build',
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.txt', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  plugins: plugins,
};
