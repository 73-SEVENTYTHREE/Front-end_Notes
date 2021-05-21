const a = [1, 2, 2, 3, 4, 5, 6, 3, 4, 56, NaN, NaN, 7, 8, 8, 8, 89, 2, 1];
function remRepeat(arr){
    return [...new Set(arr)]
}
console.log(remRepeat(a))