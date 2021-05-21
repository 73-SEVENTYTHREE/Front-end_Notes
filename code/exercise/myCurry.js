let judge
let curry = fn => judge = (...args) => fn.length === args.length ? fn(...args) : arg => judge(...args, arg)

let add1 = curry((a, b, c) => a + b + c)
console.log(add1(1)(2)(3))
console.log(add1(1, 2)(3))


function add2(){
    let args = arguments
    let adder = function (){
        args = [...args, ...arguments]
        return adder
    }
    adder.sumOf = () => {
        total = args.reduce((pre, cur) => pre + cur)
        console.log(total)
    }
    return adder
}

add2(1)(2,3,4)(5).sumOf()