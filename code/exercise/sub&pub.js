function MessageCenter(){
    this.message = {};
}
MessageCenter.prototype.register = function (name){
    if(this.message[name] !== undefined){
        console.log("该名称已被注册");
    }
    else{
        this.message[name] = [];
        console.log("注册成功");
    }
}
MessageCenter.prototype.subscribe = function (name, callback){
    if(this.message[name] === undefined){
        console.log("请先注册该消息");
    }
    else{
        this.message[name].push(callback);
        console.log("订阅成功");
    }
}
MessageCenter.prototype.publish = function (name, event){
    if(this.message[name] === undefined){
        console.log("请先注册该消息");
    }
    else{
        this.message[name].forEach(item => item(event));
        console.log("发布成功");
    }
}
let m = new MessageCenter();
m.register("test");
m.subscribe("test", (event) => console.log(event));
m.publish("test", {a:1, b:2})