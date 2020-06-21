const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    filename: 'passhelp.min.js',
    library: 'passhelp',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // strip out node logic; ensures 'crypto' module doesn't get bundled
      'typeof require': JSON.stringify('undefined'),
    }),
  ],
};
