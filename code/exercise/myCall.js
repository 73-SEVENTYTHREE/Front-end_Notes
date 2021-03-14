Function.prototype.myCall = function (obj){
    obj = obj || window
    obj.fn = this
    if (arguments.length === 1) obj.fn()
    else{
        let [o, ...args] = [...arguments]
        eval('obj.fn(' + args + ')')
    }
    delete obj.fn
}

function test(a, b){
    console.log(this.name, a, b)
}

let obj = {
    name: 'lw'
}

test.myCall(obj, 1, 2)