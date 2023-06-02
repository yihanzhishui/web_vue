//在vue项目的mian.js文件中，引入js-md5并挂载原型
import md5 from "js-md5";
import Vue from "vue";

// 挂载md5
Vue.prototype.$md5 = md5;