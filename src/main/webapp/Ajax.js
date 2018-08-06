const Ajax = {
  getData(url, data, timeout = 0, ontimeout = this.ontimeout){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const dataString = this.getDataString(data);
     // console.log(dataString);
      xhr.ontimeout = ontimeout;
      xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve, xhr);
      xhr.open("GET", url + dataString, true);
      xhr.timeout = timeout;
      xhr.responseType = "json";
      xhr.send();
    });
  },
  postData(url, data, timeout = 0, ontimeout = this.ontimeout){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const dataString = this.postDataString(data);
      xhr.ontimeout = ontimeout;
      xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve, xhr);
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.timeout = timeout;
      xhr.responseType = "json";
      xhr.send(dataString);
    })
  },
  postJSON(url, data, timeout = 0, ontimeout = this.ontimeout){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.ontimeout = ontimeout;
      xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve, xhr);
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.timeout = timeout;
      xhr.responseType = "json";
      xhr.send(JSON.stringify(data));
    })
  },
  postFormData(url, formData, onprogress = this.onprogress, timeout = 0, ontimeout = this.ontimeout){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      console.log(formData);
      xhr.ontimeout = ontimeout;
      xhr.upload.onprogress = event => onprogress(event);
      xhr.onreadystatechange = this.onreadystatechange.bind(this, resolve, xhr);
      xhr.open("POST", url, true);
      xhr.timeout = timeout;
      xhr.responseType = "json";
      xhr.send(formData);
    })
  },
  getDataString(data){
    if(!data) return '';
    let dataString = ["?"];
    for(let [key, value] of Object.values(Object.entries(data))){
      dataString.push(key + "=" + value + "&");
    }
    //console.log(dataString);
    return dataString.join("").slice(0, -1);
  },
  postDataString(data){
    if(!data) return '';
    let dataString = [];
    console.log(data);
    const keyValues = Object.entries(data);
    for(let [key, values] of Object.values(keyValues)){
      if(typeof(values) === "string"){
        dataString.push(key + "=" + values + "&");
      }else{
        for(let value of Object.values(values)){
          dataString.push(key + "=" + value + "&");
        }
      }
    }
    return dataString.join("").slice(0, -1);
  },
  request({
    method = "GET",
    url,
    data,
    timeout = 0,
    ontimeout,
    onprogress,
    ContentType
  } = {}){
    if(method.toUpperCase() === "GET"){
      return this.getData(url, data, timeout, ontimeout);
    }
    if(method.toUpperCase() === "POST"){
      if(ContentType === "application/json"){
        return this.postJSON(url, data, timeout, ontimeout);
      }
      if(data instanceof FormData){
        return this.postFormData(url, data, onprogress, timeout, ontimeout);
      }
      return this.postData(url, data, timeout, ontimeout);
    }
  },
  onreadystatechange(resolve, xhr){
    if(xhr.readyState === 4){
      const status = xhr.status;
      if(status === 200){
        //console.log(xhr.response);
        resolve(xhr.response);
      }
      this.onstatus(status);
    }
  },
  onprogress(event){
    console.log(event.loaded / event.total);
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
  }
};
