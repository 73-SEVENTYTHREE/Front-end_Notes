function myNew(){
    let [constructor, ...args] = [...arguments] //获取构造函数和参数
    let obj = {} //创建对象
    obj.__proto__ = constructor.prototype //实例的隐式原型指向构造函数的显示原型
    let ret = constructor.call(obj, ...args) //执行构造函数
    return typeof ret === 'object' ? ret || obj : obj //根据返回值类型确定对象的值
}

function Test(name, age){
    this.name = name
    this.age = age
    return null
}
Test.prototype.getName = function (){
    console.log(this.name)
}

let p = myNew(Test, 'lw', 18)

console.log(p)

let q = new Test('lw', 18)
console.log(q)