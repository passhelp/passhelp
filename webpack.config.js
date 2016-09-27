const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: './dist',
    filename: 'passhelp.min.js',
    library: 'passhelp',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['', '.ts'],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // strip out node logic; ensures 'crypto' module doesn't get bundled
      'typeof require': JSON.stringify('undefined'),
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
  ],
};
