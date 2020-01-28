// ES Module模块引入方式
// CommonJS模块引入规范
// CMD
// ADM
// index.js文件
// var Header = require('./js/header.js');
// var Sidebar = require('./js/sidebar.js');
// var Content = require('./js/content.js');
import style from './scss/index.scss'
// import wework from '../asset/wework.jpg'
// import createAvatar from './js/createAvatar' 

// new Header();
// new Sidebar();
// new Content();
// createAvatar();
// var img = new Image();
// img.src = wework;
// img.classList.add(style.wework)
// var root = document.getElementById('root')
// root.append(img)

// --------------------分割线----------------
// 打包第三方字体
var root = document.getElementById('root')
root.innerHTML = '<div class="iconfont iconbussiness-man"></div>'
