import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import TDesignUI from "./Tdesign-UI/tdesign-ui.js";
//在vue项目的mian.js文件中，引入js-md5并挂载原型
import md5 from "js-md5";
import axios from "axios";

// 挂载axios
Vue.prototype.$http = axios;

// 挂载md5
Vue.prototype.$md5 = md5;

// 访问基路径
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
