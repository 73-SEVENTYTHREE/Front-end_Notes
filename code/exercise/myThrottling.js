function myThrottling(fn, wait, mustRun){
    let starttime = Date.now()
    let timeout
    return function (){
        let context = this
        let currenttime = Date.now()
        clearTimeout(timeout)
        if(currenttime - starttime > mustRun) {
            fn.call(context, ...arguments)
            starttime = currenttime
        }
        else{
            timeout = setTimeout(fn, wait)
        }
    }

}