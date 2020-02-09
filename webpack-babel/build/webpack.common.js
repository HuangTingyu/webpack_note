var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        main:'./src/index.js',
      },
    module: {
        rules: [{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: 'babel-loader'
         }]
    },
    plugins: [
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new CleanWebpackPlugin(),
    ],
    output: {
        publicPath:'/',
        filename:'[name].js',
        path: path.resolve(__dirname, './dist'),
      },
      
}