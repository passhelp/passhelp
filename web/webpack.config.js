const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    // strip out node logic; ensures 'crypto' module doesn't get bundled
    'typeof require': JSON.stringify('undefined'),
  }),
  new ExtractTextPlugin('style.css', {allChunks: true}),
  new HtmlWebpackPlugin({
    template: './template.ejs',
    inject: false,
    cache: false,
    minify: {
      collapseWhitespace: true,
    },
  }),
];

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

module.exports = {
  entry: {
    app: './app.ts',
  },
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
  },
  plugins: plugins,
  devtool: prod ? undefined : 'cheap-module-eval-source-map',
};
