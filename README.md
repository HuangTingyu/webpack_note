# webpack_note
webpack学习笔记

## 01.搭建环境

目录—— `webpack-demo`

1.使用webpack管理项目，首先要让项目符合node规范

```
npm init
```

2.在 `package.json` 文件里面加上

```
"private": true
```

这样，项目就不会被发布到npm线上仓库

3.安装webpack

注意，不要全局安装！！！

出锅情景，有两个项目同时依赖webpack，一个使用webpack3打包，一个使用webpack4打包，如果全局安装webpack，不能同时启动两个项目，会有一个项目跑不起来。

所以创建一个目录

```
cnpm install webpack webpack-cli -D
```

安装好之后，查看webpack版本号

```
npx webpack -v
```

## 02.打包命令配置

`webpack.config.js`

```
const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

`package.json`

```
"scripts": {
        "bundle": "webpack"
},
```

src目录中存放业务代码，打包 `index.js`

```
npm run bundle
```

## 03. `webpack `核心概念

### 01.核心概念——loader

对于后缀名不是 `.js` 的文件，都要通过 `loader`去打包

下面实例一下图片的打包——

#### 01.下载 `file-loader`

```
cnpm install file-loader -D
```

#### 02.添加 `webpack` 配置文件

`webpack.config.js`

```
module: {
        rules: [{
            pic: /\.jpg$/,
            use: {
                loader: 'file-loader'
            }
        }]

    },
```

#### 03.打包

```
npm run bundle
```

#### file-loader本质

把打包的文件，复制到dist目录下，同时可以通过

```
var picture = require('../asset/wework.jpg')
```

获得图片当前的地址。

#### module本质(webpack.config.js)

标记出webpack不认识的文件，标明打包工具。

编译 `.vue` 文件同理。下面取自vue项目的 `webpack.base.conf.js`

```
rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
```

### 02.配置——loader

#### placeholder(规范打包后的图片名称)

在options里面加上 `name: '[name].[ext]'`，使得打包出来的图片名称，和打包前的一样。

```js
module: {
        rules: [{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader',
                // placeholder占位符
                options: {
                    name: '[name].[ext]'
                }
            }
        }]

    },
```

关于 `file-loader` 的配置参数 —— <https://webpack.js.org/loaders/file-loader/>

#### outputPath(规范打包后的文件路径)

```js
options: {
  name: '[name].[ext]',
  outputPath: 'images/'
}
```

#### url-loader(把图片打包成base64的格式)

```js
options: {
  name: '[name].[ext]',
  outputPath: 'images/',
  limit: 2048
}
```

加上 `limit` 参数以后，如果图片小于2048b (2kb) 就会被转化为base64的格式，保存在打包后的文件中。

如果图片大于2048b (2kb)，就会被复制到dist文件夹中。