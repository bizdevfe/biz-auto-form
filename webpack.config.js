const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/index'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'biz-auto-form',
    libraryTarget: 'umd',
    filename: 'auto-form.min.js'
  },
  externals: {'react': 'React'},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin()
  ]
};
