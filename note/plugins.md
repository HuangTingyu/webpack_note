## plugins

### HtmlWebpackPlugin

#### 作用 - 

打包后自动在dist中生成一个html文件，并把生成的js自动引入到这个html

#### 使用 -

具体详见webpack参考文档的plugins部分中的HtmlWebpackPlugin。

`webpack.config.js`

```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

在src目录添加`index.js`

打包后生成dist目录下，两个文件，一个`bundle.js` , 一个`index.html`



