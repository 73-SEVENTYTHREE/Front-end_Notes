/*
    读取resource文件夹下的1.html, 2.html, 3.html 文件内容并进行拼接
 */

const fs = require('fs')
const util = require('util')
const myReadFile = util.promisify(fs.readFile)

// //回调函数实现方式
// fs.readFile('./resource/1.html', (err, data1) => {
//     if (err) throw err
//     fs.readFile('./resource/2.html', (err, data2) =>{
//         if (err) throw err
//         fs.readFile('./resource/3.html', (err, data3) =>{
//             if (err) throw err
//             console.log(data1 + data2 + data3)
//         })
//     })
// })

f = () => 1
main = async() =>{
    let data4 = await f()
    let data1 = await myReadFile('./resource/1.html')
    let data2 = await myReadFile('./resource/2.html')
    let data3 = await myReadFile('./resource/3.html')
    console.log(data1 + data2 + data3 + data4)
}
main()
console.log(222)