
function myAjax(method, url){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
                else reject(xhr.response);
            }
        }
    })
}
let p = new myAjax('get', 'https://www.baidu.com');
p.then(data => console.log(data), error => console.log(error));