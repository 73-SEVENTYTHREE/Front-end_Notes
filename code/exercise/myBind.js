Function.prototype.myBind = function (obj){
    let self = this
    let [o, ...args] = [...arguments]
    function fNOP() {}
    function fBound(){
        let bindArgs = [...arguments]
        return self.apply(this instanceof fNOP?this:obj, args.concat(bindArgs))
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}

function test(a, b, c){
    console.log(this.name,a,b,c)
}

let obj = {
    name:'lw'
}

let p = test.myBind(obj, 1, 2)
let q = new p(1)
console.log(q)