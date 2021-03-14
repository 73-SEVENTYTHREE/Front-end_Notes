let judge
let curry = fn => judge = (...args) => fn.length === args.length ? fn(...args) : arg => judge(...args, arg)

let add1 = curry((a, b, c) => a + b + c)
console.log(add1(1)(2)(3))
console.log(add1(1, 2)(3))


function add2(){
    let args = [...arguments]

    function adder(){
        args = [...args, ...arguments]
        return adder
    }

    adder.toString = () => {
        let sum = 0;
        args.forEach(item => sum += item)
        return sum.toString()
    }
    return adder
}

console.log(add2(1)(2,3,4)(5) == 15)