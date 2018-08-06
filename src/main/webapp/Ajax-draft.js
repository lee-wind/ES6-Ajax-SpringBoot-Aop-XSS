const Ajax = {
    xhr: new XMLHttpRequest(),
    //get请求
    getData(url, data, timeout = 0, ontimeout = this.ontimeout){ // * 函数参数的默认值
        return new Promise((resolve) => {
            let xhr = this.xhr;
            xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve); // * bind方法解决this指向问题
            xhr.ontimeout = ontimeout;
            xhr.open("GET", url + "?" + this.getDataString(data), true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.responseType = "json";
            xhr.timeout = timeout;
            xhr.send();
        })
    },
    //post请求
    postData(url, data, timeout = 0, ontimeout = this.ontimeout){ // * 函数参数的默认值
        return new Promise((resolve) => {
            let xhr = this.xhr;
            xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve); // * bind方法解决this指向问题
            xhr.ontimeout = ontimeout;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.responseType = "json";
            xhr.timeout = timeout;
            xhr.send(this.postDataString(data));
        })
    },
    //发送json数据
    postJSON(url, data, timeout = 0, ontimeout = this.ontimeout){ // * 函数参数的默认值
        return new Promise((resolve) => {
            let xhr = this.xhr;
            xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve); // * bind方法解决this指向问题
            xhr.ontimeout = ontimeout;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            xhr.timeout = timeout;
            xhr.send(JSON.stringify(data));
        })
    },
    //发送FormData数据（通常用于文件上传）
    postFormData(url, data, onprogress, timeout = 0, ontimeout = this.ontimeout) {
        return new Promise((resolve) => {
            let xhr = this.xhr;
            xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve); // * bind方法解决this指向问题
            xhr.ontimeout = ontimeout;
            if (onprogress) {
                xhr.upload.onprogress = event => { // * 箭头函数
                    onprogress(event);
                }
            }
            xhr.open("POST", url, true);
            xhr.responseType = "json";
            xhr.timeout = timeout;
            xhr.send(data);
        })
    },
    req({  // * 函数与解构赋值默认值
            method = "GET",
            url,
            data,
            timeout = 0,
            ontimeout = this.ontimeout,
            progress = false,
            onprogress,
            contentType
        } = {}){
        let xhr = this.xhr;
        xhr.onreadystatechange = this.onreadystatechange;
        xhr.ontimeout = this.timeout;
        if(onprogress){
            xhr.upload.onprogress = function(event){
                onprogress(event);
            }
        }
        if(method.toUpperCase() === "GET"){
            return this.getData(url, data, timeout, ontimeout);
        }
        if(method.toUpperCase() === "POST"){
            if(contentType === "application/json"){
                return this.postJSON(url, data, timeout, ontimeout);
            }
            if(data instanceof FormData){ // * instanceof 判断对象实例
                return this.postFormData(url, data, onprogress, timeout, ontimeout);
            }
            return this.postData(url, data, timeout, ontimeout);
        }
    },
    //get字符串
    getDataString(data){
        let dataString = [];
        for(let key in data){ // * for...in 对象的遍历， ie9+
            dataString.push(key + "=" + data[key] + "&");
        }
        return dataString.join("").slice(0, -1); // * slice 与 substring 的区别是 slice 的参数可以为负数
    },
    //post字符串
    postDataString(data){
        let dataString = [];
        let keys = Object.keys(data);
        for(let key of keys){ // * for...of遍历数组跟对象 ie不支持
            if(Array.isArray(data[key])){ // * isArray 判断是否是数组
                data[key].forEach(value => { // * forEach 遍历数组，ie9 +
                    dataString.push(key + "=" + value + "&");
                });
                break;
            }
            dataString.push(key + "=" + data[key] + "&");
        }
        return dataString.join("").slice(0, -1); //* join 数组转字符串
    },
    //状态改变
    onreadystatechange(resolve){
        let xhr = this.xhr;
        if(xhr.readyState === 4){
            let status = xhr.status;
            console.log(`状态码：${status}`); // * 模板字符串，ie不支持
            if(status === 200){
                resolve(xhr.response);
            }else{
                this.onstatus(status);
            }
        }
    },
    //超时
    ontimeout(){
        alert("连接超时");
    },
    //错误状态码
    onstatus(status){
        switch(status){
            case 500:
                alert("未完成的请求。服务器遇到了一个意外的情况。");
                break;
            case 404:
                alert("服务器无法找到所请求的页面。");
                break;
            case 400:
                alert("服务器不理解请求。");
                break;
            case 403:
                alert("禁止访问所请求的页面。");
                break;
            case 405:
                alert("在请求中指定的方法是不允许的。");
                break;
            case 502:
                alert("未完成的请求。服务器从上游服务器收到无效响应。");
                break;
            case 503:
                alert("未完成的请求。服务器暂时超载或死机。");
                break;
            case 504:
                alert("网关超时。");
                break;
        }
    },
}