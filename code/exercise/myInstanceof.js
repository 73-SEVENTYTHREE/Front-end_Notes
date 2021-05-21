function myInstanceof(leftValue, rightValue){
    if(leftValue === null || leftValue === undefined){
        throw "wrong input";
    }
    if(typeof leftValue !== 'object' && typeof leftValue !== 'function'){
        throw "wrong input";
    }
    let proto = leftValue.__proto__;
    let prototype = rightValue.prototype;
    while(true){
        if(proto === prototype) return true;
        if(proto === null) break;
        proto = proto.__proto__;
    }
    return false;
}
let Test = function (){
    this.a = 1;
}
let temp = new Test();
console.log(myInstanceof(temp, Function))