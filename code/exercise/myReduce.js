Array.prototype.myReduce = function (fn, initialValue){
    if(initialValue === undefined && this.length === 0) {
        throw '没有初始值的空数组！'
    }
    let res = initialValue ? initialValue : this[0];
    for(let i = initialValue ? 0 : 1; i < this.length; i++){
        res = fn(res, this[i], i, this)
    }
    return res
}

let a = [12,2,3]
console.log(a.myReduce((a, b) => a + b, 1))