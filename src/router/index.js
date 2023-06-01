import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/user/Index.vue";
import Home from "@/components/main/Home/Home.vue";
import Overview from "@/components/main/Overview/Overview.vue";
import Search from "@/components/main/Search/Search.vue";
import Book from "@/components/main/Book/Book.vue";
import Mine from "@/components/main/Mine/Mine.vue";
import Map from "@/components/main/Map/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    redirect: "/map",
    children: [
      { path: "/map", component: Map },
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

router.beforeEach((to, from, next) => {
  // to 目标
  // from 来源
  if (to.path === "/index") {
    return next();
  }
  // 需修改
  if (false) {
    console.log("***");
    return next("/index");
  }
  next();
});

export default router;
