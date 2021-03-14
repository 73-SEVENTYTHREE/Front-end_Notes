// util.promisify 方法
const util = require('util')
const fs = require('fs')
//返回一个promise对象，相当于上方的myReadFile.js中实现的函数
let myReadFile = util.promisify(fs.readFile)
myReadFile('resource/test.txt').then(value => console.log(value.toString()), reason => console.log(reason))