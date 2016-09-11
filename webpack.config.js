module.exports = {
  entry: './web/app.ts',
  output: {
    path: './build',
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
