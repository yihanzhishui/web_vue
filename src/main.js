import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import TDesignUI from "./Tdesign-UI/tdesign-ui.js";

import axios from "axios";
Vue.prototype.$http = axios;

// 访问基路径
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
