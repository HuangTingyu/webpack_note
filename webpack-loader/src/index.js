// ES Module模块引入方式
// CommonJS模块引入规范
// CMD
// ADM
// index.js文件
var Header = require('./header.js');
var Sidebar = require('./sidebar.js');
var Content = require('./content.js');
var wework = require('../asset/wework.jpg')

new Header();
new Sidebar();
new Content();

var img = new Image();
img.src = wework;

var root = document.getElementById('root')
root.append(img)