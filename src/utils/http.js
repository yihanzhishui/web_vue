import axios from "axios";
import router from "@/router/index.js";
import Vue from "vue";

// 挂载axios
Vue.prototype.$http = axios;

// 基路径
axios.defaults.baseURL = "/api";

// 超时
axios.defaults.timeout = 10000;

let that = this;
// 请求拦截
axios.interceptors.request.use(
  function (config) {
    const token = sessionStorage.token;

    config.headers["Content-Type"] = "application/json";

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    // return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.message);
    if (error.message.includes("timeout")) {
    }
    // return Promise.reject(error);
  }
);
