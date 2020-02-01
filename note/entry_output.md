## entry/output

### entry语法

```js
entry: './src/index.js'
```

相当于

```js
entry:{
  main: './src/index.js'
}
```

此时如果不指定output输出的文件名称，像下面这样

```js
output: {
    path: path.resolve(__dirname, './dist'),
  },
```

`dist` 目录下，会默认输出一个名为 `main.js` 的打包文件。

### 场景1 : 打包多个文件

```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode:'development',
  entry: {
    main:'./src/index.js',
    sub:'./src/index.js'
  },
  output: {
    filename:'[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [new HtmlWebpackPlugin({
      template:'./src/index.html'
  }),new CleanWebpackPlugin()]
};
```

#### entry 部分

```
entry: {
    main:'./src/index.js',
    sub:'./src/index.js'
  },
```

#### output部分

```
output: {
    filename:'[name].js',
    path: path.resolve(__dirname, './dist'),
  },
```

使用 `HtmlWebpackPlugin` 之后，生成的 `index.html` 自动插入

```html
<script type="text/javascript" src="main.js"></script><script type="text/javascript" src="sub.js"></script>
```

### 场景2 : 插入cdn域名

比如，加入`http://cdn.com.cn` 

output 里面加一项配置 `publicPath:'http://cdn.com.cn'` 

```
output: {
    publicPath:'http://cdn.com.cn',
    filename:'[name].js',
    path: path.resolve(__dirname, './dist'),
  },
```

生成的 `index.html` 链接自动加上`http://cdn.com.cn` 

```html
<script type="text/javascript" src="http://cdn.com.cn/main.js"></script><script type="text/javascript" src="http://cdn.com.cn/sub.js"></script>
```

### 参考资料

仔细阅读 webpack文档中 `guides/Output Management` 部分，链接<https://webpack.js.org/guides/output-management/>

简单过一下 config部分，ouput配置部分<https://webpack.js.org/configuration/output/>