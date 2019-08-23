import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import routes from "./router.config";
import { setToken, getToken } from "@/libs/util";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const LOGIN_PAGE_NAME = "login";

// 跳转拦截
router.beforeEach(async (to, from, next) => {
  // 判断是否有token，有token就去获取用户信息
  document.title = to.meta.title;
  const token = await getToken();
  if (token == "sign-out" && to.name !== LOGIN_PAGE_NAME) {
    next({
      replace: true,
      name: LOGIN_PAGE_NAME
    });
  } else if (token == "sign-out" && to.name === LOGIN_PAGE_NAME) {
    next();
  } else if (token == "sign-in" && to.name === LOGIN_PAGE_NAME) {
    next({
      replace: true,
      name: "home"
    });
  } else {
    if (store.state.user.hasGetInfo) {
      next();
    } else {
      store
        .dispatch("getUserInfo")
        .then(() => {
          next();
        })
        .catch(() => {
          setToken("");
          next({
            replace: true,
            name: "login"
          });
        });
    }
  }
});
export default router;
