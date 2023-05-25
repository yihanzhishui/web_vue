import Vue from "vue";
import VueRouter from "vue-router";

import Login_Register from "../components/user/Login_Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login_register",
    component: Login_Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
