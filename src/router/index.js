import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/user/Index.vue";
import Home from "@/components/main/Home/Home.vue";
import Overview from "@/components/main/Overview/Overview.vue";
import Search from "@/components/main/Search/Search.vue";
import Book from "@/components/main/Book/Book.vue";
import Mine from "@/components/main/Mine/Mine.vue";
import Map from "@/components/main/Map/MapView.vue";
import NotFound from "@/components/system/404/404.vue";
import NetworkError from "@/components/system/network_error/network_error.vue";
import ServerError from "@/components/system/500/500.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },

  {
    path: "/index",
    name: "index",
    component: Index,
    meta: {
      is_login: true,
    },
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

  // 所有未定义路由，全部重定向到404页
  {
    path: "*",
    redirect: "/404",
  },

  {
    path: "/404",
    name: "404 Not Found",
    component: NotFound,
  },

  // 网络故障
  {
    path: "/network_error",
    name: "NetworkError",
    meta: { title: "网络异常" },
    component: NetworkError,
  },

  {
    path: "/500",
    name: "InternalServerError",
    meta: { title: "服务器内部错误" },
    component: ServerError,
  },
];

const router = new VueRouter({
  routes,
});

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // to 目标
  // from 来源
  // 去登陆注册页,直接放行
  if (to.path === "/index") {
    return next();
  }

  if (!sessionStorage.token) {
    return next("/index");
  }
  next();
});

export default router;
