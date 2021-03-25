function myDebounce(fn, wait){
    let timeout
    return function (){
        clearTimeout(timeout)
        timeout = setTimeout(() => {console.log(1)}, wait)
    }
}