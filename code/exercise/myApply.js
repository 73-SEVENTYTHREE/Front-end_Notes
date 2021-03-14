Function.prototype.myApply = function (obj){
    obj = obj || window
    obj.fn = this
    if (arguments.length === 1) obj.fn()
    else{
        if (!(arguments[1] instanceof Array)){
            throw '参数形式应为数组！'
        }
        let args = [...arguments[1]]
        eval('obj.fn(' + args + ')')
    }
    delete obj.fn
}

function test(a, b){
    console.log(this.name, a, b)
}

let obj = {
    name:'lw'
}

test.myApply(obj, [1, 1])