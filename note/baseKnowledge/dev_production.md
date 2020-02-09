### development&producion

区分开发环境和生产环境

1.开发环境

`build\webpack.dev.js`

2.生产环境

`build\webpack.prod.js`

3.`package.json`

可以通过 `--config` 参数，指定配置相应的打包环境。

```
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

4.把开发环境和生产环境相同的参数，合并到同一个文件 `webpack.common.js` 中。

（1）安装webpack-merge

```
cnpm install webpack-merge -D
```

(2) `build\webpack.dev.js`

```js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode:'development',
  devtool:'eval-cheap-module-source-map',
  devServer:{
    contentBase:'./dist',
    open:true,
    hot:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization:{
    usedExports:true
  }
};

module.exports = merge(commonConfig, devConfig)
```

`build\webpack.prod.js`

```js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  mode:'production',
  devtool:'cheap-module-source-map'
};

module.exports = merge(commonConfig, prodConfig)
```

`build\webpack.common.js`

```js
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
        new CleanWebpackPlugin({
            verbose: true,
        }),
    ],
    output: {
        filename:'[name].js',
        path: path.resolve(__dirname, '../dist'),
      },
      
}
```

