function myThrottle1(fn, interval){
    let isWorking = false
    return function (){
        if(isWorking === false){
            isWorking = true
            setTimeout(() => {
                console.log(fn.call(this, ...arguments))
                 isWorking = false
            }, interval)
        }
    }
}

function myThrottle2(fn, interval){
    let lastTime = new Date()
    return function (){
        let curTime = new Date()
        if(curTime - lastTime >= interval) {
            console.log(fn.call (this, ...arguments))
            lastTime = curTime
        }
    }
}

let sum = myThrottle1((a, b) => a + b, 1000)
for(let i = 0; i < 100000000; i++){
    sum(2, 2)
}