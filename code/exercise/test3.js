function encode(string){
    let stack = [];
    let len = string.length;
    let level = 0;
    let str = ""
    for(let i = 0; i < len; i++){
        if((string[i] >= 'a' && string[i] <= 'z') || string[i] === '(' || string[i] === '<' ||
            (string[i] >= '0' && string[i] <= '9')){
            stack.push(string[i]);
        }
        if(string[i] === ')'){
            str = "";
            while(stack[stack.length - 1] !== '('){
                str = stack[stack.length - 1] + str;
                stack.pop();
            }
        }
        if(string[i] === '>'){
            let number = "";
            while(stack[stack.length - 1] !== '<'){
                number = stack[stack.length - 1] + number;
                stack.pop();
            }
            let count = parseInt(number);
            for(let j = 0; i < count; j++){
                stack.push(str);
            }
        }
    }
    return stack.join('');
}
console.log(encode('d(a)<3>(bc)<2>'));