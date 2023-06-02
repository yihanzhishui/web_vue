import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./Tdesign-UI/tdesign-ui.js";
import "@/utils/http.js";
import "@/utils/md5.js";

// 显示开发提示
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
