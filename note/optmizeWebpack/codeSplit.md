### 文件加载优化

场景：如果此时在一个文件中引入了第三方库，第三方库体积较大，生成的打包文件体积也将很大。那么，能不能把第三库单独拎出来，不要塞到一个打包文件呢？

### 分割指南

#### 1.手动分割示例

利用浏览器的并行加载，浏览器可以同时加载多个文件。

1.举例，引入lodash

src下面多建一个`lodash.js`

```
import _ from 'lodash'
window._ = _
```

2.`webpack.common.js` 多加一个入口

```
entry: {
        lodash:'./src/lodash.js',
        main:'./src/index.js',
      },
```

3.`index.js` 使用

(此处不用import, 直接使用就完事)

```
console.log(_.join(['a', 'b', 'c'], '***'))
```

假设业务代码(index.js, 1mb), 引入第三方代码 (lodash.js ,1mb

首先，由于浏览器可以并行加载多个文件，同一段时间内，同时加载这两个文件，相比加载2mb的文件来说，可以提高加载速度。

然后，因为lodash.js一般是不作变更的，所以，在用户的浏览器会缓存`lodash.js` ，下次再进入页面的时候，只要加载业务代码`index.js` 即可。

#### 2.自动分割(标红！重点！)

#### 同步代码引入 ——

`webpack.common.js`

```js
optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
```

#### 异步代码引入 ——

ps.现在时间是2020年，使用上面的配置，已经可以实现第三方库的动态引用。

关于动态引用

```js
function getComponent(){
    return import('lodash').then(({ default:_ }) => {
        var element = document.createElement('div')
        element.innerHTML = _.join(['Tencent', 'SakuraHuang'], '-')
        return element
    })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
```

但是，旧版本的动态引用，需要babel配合。

具体，就是下载 `babel-plugin-dynamic-import-webpack`

然后，`.babelrc` 里面加一项配置

```
plugins: ["dynamic-import-webpack"]
```

