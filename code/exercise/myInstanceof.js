function myInstanceof(leftValue, rightValue){
    if (leftValue === undefined || null) return false
    if (typeof leftValue !== 'object' && typeof leftValue !== 'function') return false
    let prototype = rightValue.prototype
    let proto = leftValue.__proto__
    while (true){
        if (proto === null) return false
        if (proto === prototype) return true
        proto = proto.__proto__
    }
}

function Test(){}
let t = new Test()
console.log(myInstanceof(t, Function))