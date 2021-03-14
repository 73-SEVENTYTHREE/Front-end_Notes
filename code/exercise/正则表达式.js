/*
    正则表达式；
        -
 */

//创建正则表达式(是否含有a)
//i表示忽略大小写
let reg = new RegExp("a", "i");

//字面量创建正则表达式
//'|'字符表示a或者b('[]'也行)
let reg1 = /[a-z]/i
let reg2 = /a/i

//[^]：除了
let reg3 = /[^ab]/i
//量词：{n}、{m, n}、{m, }、+(至少一个)、*（0个或多个）、?(0或1)
//  /^a/ 以a开头
//  /a$/ 以a结尾
let str = "              adm     in      "
let reg4 = /^\s*|\s*$/g;

//test()测试str中是否含有a
console.log(str.replace(reg4,""))