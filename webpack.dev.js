const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'demos', 'index.js'),
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader"}
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demos'),
    host: '0.0.0.0',
    inline: true,
    hot: true,
  }
};
