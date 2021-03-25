class MyPromise {

    constructor(executor) {
        //添加属性
        this.PromiseState = 'pending'
        this.PromiseResult = null
        //存放声明异步任务时的成功或者失败的回调函数
        this.callbacks = []
        //编写resolve和reject函数，并且控制状态和结果只能改变一次
        let resolve = value => {
            if (this.PromiseState !== 'pending') return
            //修改状态 PromiseState
            this.PromiseState = 'resolved'
            //修改结果值 PromiseResult
            this.PromiseResult = value
            //使用定时器是为了让then()里的任务异步执行
            setTimeout(() => {
                //如果executor里的是异步任务，则先通过then()拿到callbacks里中保存的函数，再执行
                this.callbacks.forEach(item =>{
                    if (item.onResolved) item.onResolved(this.PromiseResult)
                })
            })
        }
        let reject = reason => {
            if (this.PromiseState !== 'pending') return
            this.PromiseState = 'rejected'
            this.PromiseResult = reason
            setTimeout(() => {
                this.callbacks.forEach(item =>{
                    if (item.onRejected) item.onRejected(this.PromiseResult)
                })
            })
        }
        //处理抛出错误
        try{
            //同步调用executor
            executor(resolve, reject)
        }catch (e){
            //调用失败函数
            reject(e)
        }
    }

    then = (onResolved, onRejected) => {
        //异常穿透
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        //值传递
        if (typeof onResolved !== 'function') onResolved = value => value

        return new MyPromise((resolve, reject) => {
            //封装回调函数
            let callback = type => {
                //try-catch接收抛出的错误
                try {
                    let result = type(this.PromiseResult)
                    if (result instanceof MyPromise) {
                        //如果结果是一个Promise对象
                        result.then(value => resolve(value), reason => reject(reason))
                    } else {
                        //如果结果不是一个Promise对象，则结果状态为成功
                        resolve(result)
                    }
                } catch (e) {
                    reject(e)
                }
            }
            if (this.PromiseState === 'resolved') {
                //使用定时器是为了让then()里的任务异步执行
                setTimeout(() => callback(onResolved))
            }
            else if (this.PromiseState === 'rejected') {
                setTimeout(() => callback(onRejected))
            }
            else {
                //保存回调函数
                this.callbacks.push({onResolved: () => callback(onResolved), onRejected: () => callback(onRejected)})
            }
        })
    }

    catch = onRejected =>{
        return this.then(undefined, onRejected)
    }

    static resolve(value){
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise){
                value.then(value => resolve(value), reason => reject(reason))
            }else{
                resolve(value)
            }
        })
    }

    static reject(reason){
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(promises){
        return new MyPromise((resolve, reject) => {
            let successNum = 0
            let successResults = []
            int len = promises.length;
            promises.forEach((item, index) =>{
                item.then(value => {
                    successNum++
                    successResults[index] = value
                    if (successNum === len){
                        resolve(successResults)
                    }
                }, reason => {
                    reject(reason)
                })
            })
        })
    }

    static race(promises){
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++){
                promises[i].then(value => resolve(value),reason => reject(reason))
            }
        })
    }
}

let p1 = new MyPromise((resolve, reject) => {
        resolve(1)
})
console.log(p1)
let p2 = new MyPromise((resolve, reject) => {
    resolve(2)
})
console.log(p2)
let p3 = MyPromise.all([p1, p2])
console.log(p3)
let p4 = MyPromise.race([p1, p2])
console.log(p4)