const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    // strip out node logic; ensures 'crypto' module doesn't get bundled
    'typeof require': JSON.stringify('undefined'),
  }),
  new HtmlWebpackPlugin({ inject: false }),
];

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    app: ['./src/app.ts', './src/style.scss'],
  },
  output: {
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader', options: { limit: 10000 }
          }
        ]
      }
    ],
  },
  plugins: plugins
};
