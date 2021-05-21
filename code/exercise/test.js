class promise2{
    constructor (executor) {
        this.promiseState = 'pending'
        this.promiseResult = null
        this.callbacks = []
        let resolve = data => {
            if(this.promiseState !== 'pending') return
            this.promiseResult = data
            this.promiseState = 'fulfilled'
            this.callbacks.forEach(item => {
                if(item.onResolved !== undefined) {
                    item.onResolved(this.promiseResult)
                }
            })
        }

        let reject = reason => {
            if(this.promiseState !== 'pending') return
            this.promiseState = 'rejected'
            this.promiseResult = reason
            this.callbacks.forEach(item => {
                if(item.onRejected !== undefined) item.onRejected(this.promiseResult)
            })
        }

        try{
            executor(resolve, reject)
        }catch (e){
            reject(e)
        }
    }

    then = (onResolved, onRejected) => {
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value
        }
        return new promise2((resolve, reject) => {
            let callback = type => {
                try{
                    let res = type(this.promiseResult)
                    if(res instanceof promise2) res.then (value => resolve (value), reason => reject (reason))
                    else resolve(res)
                }catch (e){
                    reject(e)
                }
            }
            if (this.promiseState === 'fulfilled') setTimeout(() => callback(onResolved))
            else if(this.promiseState === 'rejected') setTimeout(() => callback(onRejected))
            else this.callbacks.push({onResolved: () => callback(onResolved), onRejected: () => callback(onRejected)})
        })
    }

    static all = promises => {
        return new promise2((resolve, reject) => {
            let len = promises.length
            let successCount = 0
            let successResults = []
            for(let i = 0; i < len; i++){
                promises[i].then(value => {
                    successCount++;
                    successResults[i] = value
                    if(successCount === len) {
                        console.log(successResults)
                        resolve(successResults)
                    }
                }, reason => {
                    reject(reason)
                })
            }
        })
    }
}

let p = new promise2((resolve, reject) => {
    resolve(1)
})
let q = new promise2(resolve => resolve(2))
console.log(p, q)
console.log(promise2.all([p, q]))