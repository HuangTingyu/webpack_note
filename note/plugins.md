## plugins

plugin类似生命周期函数，可以在webpack运行到某一时刻的时候，帮你做一些东西。

### HtmlWebpackPlugin

#### 作用 - 

打包后自动在dist中生成一个html文件，并把生成的js自动引入到这个html

#### 使用 -

具体详见webpack参考文档的plugins部分中的HtmlWebpackPlugin。

#### 参数 `template`

当指定某个html文件为`template` 的时候，生成的`html` 会copy模板内容，并自动插入生成的js文件。

` webpack.config.js`

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
  plugins: [new HtmlWebpackPlugin({
      template:'./src/index.html'
  })]
};
```

在src目录添加`src/index.js` , `src/index.html`

打包后生成dist目录下，两个文件，一个`dist/bundle.js` , 一个`dist/index.html`



