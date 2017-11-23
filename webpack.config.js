const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/index'),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'auto-form.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {minimize: true}
            }
          ]
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {minimize: true}
            },
            {loader: "less-loader"}
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('auto-form.css')
  ],
  devtool: 'source-map',
};
