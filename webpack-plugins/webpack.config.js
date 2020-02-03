var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode:'production',
  devtool:'cheap-module-source-map',
  entry: {
    main:'./src/index.js',
  },
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [new HtmlWebpackPlugin({
      template:'./src/index.html'
  }),new CleanWebpackPlugin()]
};