function judgeVersion(version1, version2){
    if(!version1 || !version2) {
        throw 'wrong input'
    }
    let arr1 = version1.split('.')
    let arr2 = version2.split('.')
    let len1 = arr1.length
    let len2 = arr2.length
    let minLen = Math.min(len1, len2)
    for(var i = 0; i < minLen; i++){
        if(parseInt(arr1[i]) > parseInt(arr2[i])) return 1;
        else if(parseInt(arr1[i]) < parseInt(arr2[i])) return -1;
        else continue;
    }
    if(minLen < len1){
        for(let j = i; j < len1; j++){
            if (parseInt(arr1[j]) !== 0) return 1
        }
    }
    if(minLen < len2){
        for(let j = i; j < len2;j ++){
            if (parseInt(arr2[j]) !== 0) return -1
        }
    }
    return 0
}
console.log(judgeVersion('1.10.2', '1.01.2'))