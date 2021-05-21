Array.prototype.myFlatten = function (n = Infinity){
    return  n > 0 ? this.reduce((arr, cur) => arr.concat(cur instanceof Array ? cur.myFlatten(n - 1) : cur), []) : this;
}
let a = [1,2,3,[4,5,[6,[7]]]]
console.log(a.myFlatten())
let b = [1,2,3,4,5,6,7];
let c = b.filter(item => item % 2 === 1);
let d = b.filter(item => item % 2 === 0);
console.log(c, d);