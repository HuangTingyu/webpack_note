## babel在webpack中的使用

参考资料 —— <https://babel.docschina.org/setup#installation>

### 1.业务代码指南

详细参考 —— <https://babel.docschina.org/docs/en/babel-preset-env>

@babel/preset-env

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
            "presets": [["@babel/preset-env", {
      			"useBuiltIns":"usage" ,
      			"corejs":3
    		}]]
        }
     }]
},
```

此处的，`"useBuiltIns":"usage"` 的配置是为了压缩打包后的文件体积。只引入，业务代码所需的函数源代码。否则，如果不加这个参数，polyfill会自动把所有的函数代码都塞进打包文件中。

#### 在所有文件的入口处，记得

```
import "@babel/polyfill";
```

### 2.库代码指南

详细参考 —— <https://babel.docschina.org/docs/en/babel-plugin-transform-runtime>

使用原因 —— 避免造成，因为babel-polyfill补充函数定义，造成的全局污染。

此处使用@babel/plugin-transform-runtime，不用再引入pollyfill，也就是不用再 `import "@babel/polyfill";` 

```js
npm install --save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
```

2.配置

此处记得 `corejs:2` , 是为了引入polyfill  

`webpack.config.js`

```js
module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options:{
            "plugins": [["@babel/plugin-transform-runtime",{
              "corejs": 2,
              "helpers": true,
              "regenerator": true,
              "useESModules": false
            }]]
        }
     }]
},
```

### .babelrc

把options里面的内容，放到 `.babelrc` 中，可以使 `webpack.config.js` 文件更加简洁。

将上面的配置文件，改造如下。

`.babelrc`

```
{
    "plugins": [["@babel/plugin-transform-runtime",{
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }]]
}
```

`webpack.config.js`

```js
rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader'
     }]
```

### 3.react代码指南

详细参考 —— <https://babel.docschina.org/docs/en/babel-preset-react>

1.安装react相关

```
cnpm install react react-dom -D
```

以及babel的react相关

```
cnpm install --save-dev @babel/preset-react
```

2.配置 `.babelrc`

```
{
    "presets": [["@babel/preset-env", {
      "useBuiltIns":"usage" ,
      "corejs":3
    }],["@babel/preset-react"]]
}
```

## 优化

### tree-shaking

作用 —— 避免引入无关的模块

只支持es，也就是`import` ! （不支持 `commonJS` ，也就是`require` 的引入方法）

#### 配置

开发环境下，`mode:development`

`webpack.config.js`

```
optimization:{
    usedExports:true
  }
```

`package.json` 可以加一项配置，避免没有export模块的文件，比如`babel/polyfill` （原理：在window上面挂载各种函数）在打包过程中被自动过滤掉

```
"sideExffects":["@babel/polyfill"],
```

以及css 文件，也不要使用tree-shaking

```
"sideExffects":["*.css"]
```

### 使用

`development` 环境下 ——

配置如上文所示。

使用tree-shaking之后，打包后的文件出现了`exports used`这一项

```
/*! exports provided: add, minus */
/*! exports used: add */
```

`production` 环境下 ——

使用`tree-shaking` 打包之后，打包文件不再出现没引入的模块。