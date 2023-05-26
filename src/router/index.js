import Vue from "vue";
import VueRouter from "vue-router";

import Login_Register from "../components/user/Login_Register.vue";
import Home from "../components/main/Home.vue";
import Overview from "../components/main/Overview.vue";
import Search from "../components/main/Search.vue";
import Book from "../components/main/Book.vue";
import Mine from "../components/main/Mine.vue";

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
    redirect: "/overview",
    children: [
      { path: "/overview", component: Overview },
      { path: "/search", component: Search },
      { path: "/book", component: Book },
      { path: "/mine", component: Mine },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
