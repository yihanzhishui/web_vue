import Vue from "vue";
import VueRouter from "vue-router";

import Login_Register from "../components/user/Login_Register.vue";
import Home from "../components/main/Home.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login_register",
    component: Login_Register,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
