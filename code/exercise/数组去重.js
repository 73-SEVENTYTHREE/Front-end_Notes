const a = [1, 2, 2, 3, 4, 5, 6, 3, 4, 56, 7, 8, 7, 8, 8, 8, 89, 2, 1];
const map = {}
let b =[]
a.forEach(item => {
    if(map[item] === undefined){
        map[item] = 1;
        b.push(item);
    }
})
console.log(b)