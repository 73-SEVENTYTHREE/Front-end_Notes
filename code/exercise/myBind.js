Function.prototype.myBind = function (){
    let self = this
    let [obj, ...args] = [...arguments]
    function f1() {}
    function f2(){
        return self.apply(this instanceof f2 ? this : obj, [...args, ...arguments])
    }
    f1.prototype = this.prototype
    f2.prototype = new f1()
    return f2
}

function test(a, b, c){
    console.log(this.name,a,b,c)
}

let obj = {
    name:'lw'
}

let p = test.myBind(obj, 1, 2)
let q = new p(1)
p(1)
console.log(q)