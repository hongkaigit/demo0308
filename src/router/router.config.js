export default [
  {
    path: "/",
    component: () => import("@views/frame/Main.vue"),
    children: [
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        meta: {
          actRouter: "home",
          title: "首页"
        },
        component: () => import("@views/index/RouterEntry.vue")
      },
      {
        path: "/hotfix",
        name: "hotfix",
        meta: {
          actRouter: "hotfix",
          title: ""
        },
        component: () => import("@views/parameter/hotfix/RouterEntry.vue")
      },
      {
        path: "/module",
        name: "module",
        meta: {
          actRouter: "module",
          title: "模块配置"
        },
        component: () => import("@views/module/RouterEntry.vue")
      },
      {
        path: "/version",
        name: "version",
        meta: {
          actRouter: "version",
          title: "版本管理"
        },
        component: () => import("@views/parameter/version/RouterEntry.vue")
      },
      {
        path: "/abtest",
        name: "abtest",
        meta: {
          actRouter: "abtest",
          title: "A/B Test"
        },
        component: () => import("@views/abtest/RouterEntry.vue")
      },
      {
        path: "/amap",
        name: "amap",
        meta: {
          actRouter: "amap",
          title: "地图"
        },
        component: () => import("@views/map/RouterEntry.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "用户登录"
    },
    component: () => import("@views/login/RouterEntry.vue")
  },
  {
    path: "*",
    name: "404",
    meta: {
      title: "404"
    },
    component: () => import("@views/404/RouterEntry.vue")
  }
];
