const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';

const plugins = [];
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
    extensions: ['', '.ts', '.js', '.txt'],
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
      }
    ],
  },
  plugins: plugins,
};
