// 1. 测试polyfill
// import "@babel/polyfill";
// const arr = [
//     new Promise(()=>{}),
//     new Promise(()=>{})
// ]

// arr.map(item => {
//     console.log(item)
// })

// ------------------------------
// 2. 测试tree-shaking
// import { add } from './math.js'

// add(1,2)

// ---------------------------
// 3.测试code-splitting

// import _ from 'lodash'

// console.log(_.join(['a', 'b', 'c'], '***'))

// console.log(_.join(['a', 'b', 'c'], '***'))

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
