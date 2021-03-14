/*
    封装一个读取文件内容的函数
    参数：path 文件路径
    返回：promise对象
 */
const fs = require('fs')
function myReadFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, ((err, data) => {
            if (err) reject(err)
            else resolve(data)
        }))
    })
}

myReadFile('resource/test.txt').then(value => console.log(value.toString()), reason => console.log(reason))