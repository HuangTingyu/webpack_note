var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require('webpack');


module.exports = {
  mode:'production',
  devtool:'cheap-module-source-map',
  entry: {
    main:'./src/index.js',
  },
  devServer:{
    contentBase:'./dist',
    open:true,
    hot:true,
    hotOnly:true
  },
  module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader'
     }]
},
  output: {
    publicPath:'/',
    filename:'[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({template:'./src/index.html'}),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
],
  optimization:{
    usedExports:true
  }
};