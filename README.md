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

### 01.loader

详见 `loader.md`

### 02.plugins

详见plugins.md

### 03.webpackDevServer

关于开发过程，热刷新，详见webpackDevServer.md

### 04.entry&output以及sourceMap

entry&output以及sourceMap的相关配置，

详见entry_output_sourceMap.md

### 05.babel

关于babel的配置，如何打包es6，如何兼容低版本浏览器(babel-polyfill)，如何打包react代码(babel-react)，如何优化打包比如`tree-shaking` 的使用。

详见babel.md

### 06.dev&production

区分开发环境和生产环境，详细见 `dev_production.md`

