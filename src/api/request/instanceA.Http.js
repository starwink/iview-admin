import axios from "axios";
import qs from "qs";
import NProgress from "nprogress";
import { Message } from "view-design";

// 实例配置,实现分离不同业务的代码实例
const instanceA = axios.create({
    baseURL: '/', // 接口A的基础地址
    timeout: 10000, // 超时时间毫秒
    headers: {
        withCredentials: true
        //   'Content-Type': 'application/json',
        //   'X-Token-A': 'your-token-a' // 实例A特有的请求头
    }
})

instanceA.interceptors.request.use(
    config => {
        NProgress.start() // 设置加载进度条(开始..)
        if (localStorage.getItem("user")) {
            // config.headers["Authorization"] = JSON.parse(localStorage.getItem("user")).token
            // config.headers["Authorization"] = JSON.parse(localStorage.getItem("user")).token
            config.headers["Authorization"] = localStorage.getItem('tokenyn');
            

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


instanceA.interceptors.response.use(
    response => {
        NProgress.done() // 设置加载进度条(结束..)
        if (response.data.code === 200400) {
            //登录超时重定向
            window.location.hash = "/login"
        } else if (response.data.code !== 1) {
            Message.error({ content: response.data.message, duration: 0, closable: true });
        }
        return response;
    },
    err => {
        NProgress.done()
        if (err && err.response) {
            let error = '连接错误' + err.response.status;
            Message.error({ content: error, duration: 0, closable: true });
        } else {
            Message.error({ content: "连接到服务器失败", duration: 0, closable: true });
        }
        return Promise.resolve(err.response);
    }
);


export const request = {
    async get(url, data) {
      try {
        let res = await instanceA.get(url, { params: data });
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
          console.log(err);
      }
    },
    
    async post(url, data) {
      try {
        let headers = { "Content-Type": "application/json;charset=UTF-8" };
        let res = await instanceA.post(url, data, headers);
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
     async postForm(url, data) {
      try {
        let headers = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" };
        let res = await instanceA.post(url, qs.stringify(data), headers);
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async postLogin(url, token) {
      try {
        let headers = { "Content-Type": "application/json;charset=UTF-8" ,"authorization":token};
        let res = await instanceA.post(url, {}, headers);
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async patch(url, data) {
      try {
        let res = await instanceA.patch(url, data);
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async delete(url, data) {
      try {
      //   let headers = { "Content-Type": "application/json;charset=UTF-8" };
        let res = await instanceA.delete(url, data);
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
    //用来导出excel
    async expoertExcel(url, data){
      try {
        let res = await instanceA.post(url, qs.stringify(data), {responseType: 'blob', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    },
    getExport(url,name,type) {
      let Authorization = JSON.parse(localStorage.getItem("user")).token;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      //设置请求头参数的方式,如果没有可忽略此行代码
      xhr.setRequestHeader("Authorization", `${Authorization}`);
      //设置响应类型为 blob
      xhr.send();
      xhr.responseType = "blob";
      //关键部分
      xhr.onload = function(e) {
        //如果请求执行成功
        if (this.status == 200) {
          const link = document.createElement("a");
          let blob = new Blob([this.response],type);
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.download = name; //下载的文件名
          document.body.appendChild(link);
          link.click();
        }
      };
    },
    getUrl() {
      return instanceA.defaults.baseURL;
    },
    getToken(){
      let token='';
      // token=JSON.parse(sessionStorage.getItem('user')).token;
      token= localStorage.getItem('tokenyn');
      return token;
    },
    async sendEmail(url, data) {
      //获取用户名
      var userName = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).loginName:''
      // 邮箱发送
      try {
        let res = await instanceA.get(url, { params: data,headers:{
          'userName':userName
      }});
        res = res.data;
        return new Promise(resolve => {
          resolve(res);
        });
      } catch (err) {
          console.log(err);
      }
    },
    downExcel(url,data={},name='导出',fileExtension='xlsx'){
  
      // let Authorization = JSON.parse(localStorage.getItem("user")).token;
      let Authorization = tool.getJSONByStr(localStorage.getItem("user")).token || '';
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      //设置请求头参数的方式,如果没有可忽略此行代码
      xhr.setRequestHeader("Authorization", `${Authorization}`);
      xhr.setRequestHeader("Content-Type", 'application/json');
      //设置响应类型为 blob
      xhr.send(JSON.stringify(data));
      xhr.responseType = "blob";
      //关键部分
      xhr.onload = function (e) {
          //如果请求执行成功
          if (this.status == 200) {
              // that.$message.success("导出成功");
              const link = document.createElement("a");
              let blob = new Blob([this.response], {
                  type: "application/vnd.ms-excel;charset=utf-8"
              });
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              link.download = `${name}.${fileExtension}`; //下载的文件名
              document.body.appendChild(link);
              link.click();
          } else {
              // that.$message.error("导出失败");
          }
      };
    },
   
    
  };

// export { instanceA }