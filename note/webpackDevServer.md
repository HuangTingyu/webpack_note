## webpackDevServer

#### 初级版：webpack自动监听文件

不用再手动输入打包命令，但需要自动刷新浏览器

```
"scripts": {
    "watch":"webpack --watch"
  },
```

### 进阶版：webpack浏览器自动打开刷新

#### 作用：

如果通过双击打开 `index.html` ，那么浏览器路径是 `file:///D: ...` 。但如果要发ajax请求，要求`index.html` 必须在一个服务器上面，通过http协议的形式打开。所以，必须借助`webpack-dev-server` 生成一个http开头的网址，这样才可以发送ajax请求。

#### 使用：

1.安装`cnpm install webpack-dev-server -D`

2.`webpack.config.js`

```
devServer:{
    contentBase:'./dist',
    open:true
  },
```

参数解释 ——

`contentBase`, 服务器根目录

`open` , 自动打开浏览器，并访问服务器地址

3.`package.json`

```
"scripts": {
    "start": "webpack-dev-server"
  },
```

运行`npm run start` ,可以看到命令行窗口，服务已经在8080端口启动

```
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from ./dist
i ｢wdm｣: Hash: 4e504d9ba7e3eff443d3
Version: webpack 4.41.5
```

### webpackDevServer实现

借助 webpack中间件 `webpack-dev-middleware` 配合 `express`

```js
cnpm install express webpack-dev-middleware -D
```

`server.js`

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)

const app = express()

app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath
}))

app.listen(3000,()=>{
    console.log('server is running')
})
```

运行 `node server.js` ,服务已部署在 http://localhost:3000 , 但是需要手动刷新。

### 热模块刷新

#### 需求1：样式更新不刷新页面

需求：当样式改变的时候，不刷新页面，只刷新样式。

### 配置

加入hot和hotOnly，hotOnly表示，当html不生效的时候，也不自动刷新页面。

```js
 devServer:{
    contentBase:'./dist',
    open:true,
    hot:true,
    hotOnly:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
```

#### 需求2：只刷新改动的模块

需求：当一个文件引入两个模块，改动其中一个模块时，不要全页面刷新，只刷新改动的模块。

比如 `index.js` 文件

```js
import counter from './counter'
import number from './number'

counter();
number();

if(module.hot){
    module.hot.accept('./number', () => {
        number()
    })
}
```

改变 `js` 文件的时候，要加入 

```
if(module.hot){...}
```

为什么CSS不用加入这段？

答：因为css-loader里面已经内置了这段代码。vue里面也有类似的模块刷新机制，内置在vue-loader中。

### 参考资料

关于webpack命令 —— 在documentation-API-Command Line Interface <https://webpack.js.org/api/cli/>

关于webpack在NodeJS中的调用 —— 在documentation-API-ode Interface

关于Hot Module Replacement —— <https://webpack.js.org/guides/hot-module-replacement/>

Hot Module Replacement参数 —— <https://webpack.js.org/api/hot-module-replacement/>

Hot Module Replacement 的实现原理 —— <https://webpack.js.org/concepts/hot-module-replacement/>

