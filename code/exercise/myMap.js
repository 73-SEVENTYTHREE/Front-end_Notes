Array.prototype.myMap = function (fn){
    let res = []
    this.reduce((total, curValue, curIndex, arr) => {
        res.push(fn.call(this, curValue, curIndex, arr))
    }, null)
    return res
}

let a = [1,2,3,4,5]
console.log(a.myMap(n => n * 2))