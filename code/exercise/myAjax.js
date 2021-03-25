function myAjax(url){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()

    })
}