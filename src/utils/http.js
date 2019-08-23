import axios from "axios";

// 自定义创建 axios 实例
const http = axios.create({
  baseURL: "myvue/api", // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL process.env.baseURL
  timeout: 10000 // 请求超时时间
});

// request 添加请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么可以写在这个位置
    console.log("request");
    return config;
  },
  error => {
    //  对请求错误做些什么在这个位置写

    console.log(error);
    Promise.reject(error);
  }
);

// response 添加响应拦截器
http.interceptors.response.use(
  response => {
    // 数据返回我们需要做些说明，比如有固定的格式let response=response.data
    console.log("response success");
    return response;
  },
  error => {
    // 这里放置response返回错误时的逻辑，错误码会放在```status```当中，我们可以进行一些错误码的判断：
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 401时的操作
    //       break;
    //     case 502:
    //       // 502时的操作
    //       break;
    //     case 500:
    //       // 500时的操作
    //       break;
    //     // ️注意，这些错误码都是随便举的例子，具体要和项目当时返回的数值而定，去和后端确定错误码。
    //   }
    // }
    console.log("response error");
    console.log(error);
    return Promise.reject(error);
  }
);

export default http;
