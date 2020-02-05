### babel在webpack中的使用

参考资料 —— <https://babel.docschina.org/setup#installation>

1. 安装 babel-loader @babel/core

```
cnpm install babel-loader @babel/core -D
```

2. `webpack.config.js`

```
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
```

这里的 exclude表示，node_modules下面的代码不编译。

此处的，babel-loader只是将babel与webpack做了打通，并不能把es6编译成es5。

3. 所以进一步，安装 @babel/preset-env

```
cnpm install @babel/preset-env -D
```

4. 一步兼容低版本浏览器，补充版本缺失的语法，引入@babel/polyfill, core-js

```
cnpm install @babel/polyfill core-js -D
```

引入@babel/polyfill，`webpack.config.js` 加上配置参数

```js
module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options:{
            'presets': [['@babel/preset-env',{
              useBuiltIns:'usage',
              corejs:3
            }]]
        }
     }]
},
```

此处的，useBuiltIns的配置是为了压缩打包后的文件体积。只引入，业务代码所需的函数源代码。否则，如果不加这两个参数，polyfill会自动把所有的函数代码都塞进打包文件中。