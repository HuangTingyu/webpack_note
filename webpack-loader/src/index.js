// ES Module模块引入方式
// CommonJS模块引入规范
// CMD
// ADM
// index.js文件
var Header = require('./js/header.js');
var Sidebar = require('./js/sidebar.js');
var Content = require('./js/content.js');
import wework from '../asset/wework.jpg'
import './scss/index.scss'

new Header();
new Sidebar();
new Content();

var img = new Image();
img.src = wework;
img.classList.add('wework')

var root = document.getElementById('root')
root.append(img)