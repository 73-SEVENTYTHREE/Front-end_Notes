const fs = require('fs')

// fs.readFile('./resource/test.txt', (err, data) => {
//     if (err) throw err
//     else console.log(data.toString())
// })

//Promise实现
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/test.txt', (err, data) => {
        if (err) reject(err)
        else resolve(data)
    })
})

p.then(value => console.log(value.toString()), reason => console.log(reason))