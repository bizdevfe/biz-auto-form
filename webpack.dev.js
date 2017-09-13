const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ],
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 5000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/mock': {
                bypass: function (req) {
                    req.method = 'GET';
                }
            }
        }
    }
};