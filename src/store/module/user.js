import service from "@/utils/http.js";
import { setToken, getToken } from "@/libs/util";
let appContext = process.env.APP_CONTEXT;
export default {
  state: {
    userName: "",
    avatarImgPath: `${appContext}/assets/img/gmd.png`,
    token: getToken(),
    hasGetInfo: false
  },
  mutations: {
    avatarImgPath(state, avatarImgPath) {
      state.avatarImgPath = avatarImgPath;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setTokenm(state, token) {
      state.token = token;
      setToken(token);
    },
    setHasGetInfo(state, hasGetInfo) {
      state.hasGetInfo = hasGetInfo;
    }
  },
  actions: {
    //登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim();
      return new Promise((resolve, reject) => {
        service({
          url: "/login/login.json",
          method: "post",
          data: { userName, password }
        })
          .then(res => {
            const data = res.data;
            if (data && data.resultCode && data.resultCode == "0000") {
              commit("setTokenm", "sign-in");
              resolve();
            } else {
              throw (data && data.resultMessage) || "登录失败";
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //退出登录
    handleLoginOut({ commit }) {
      return new Promise((resolve, reject) => {
        service("/login/loginout.json")
          .then(res => {
            const data = res.data;
            if (data && data.resultCode && data.resultCode == "0000") {
              commit("setTokenm", "sign-out");
              resolve();
            } else {
              throw (data && data.resultMessage) || "退出失败";
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          service("/login/getuserinfo.json")
            .then(res => {
              const data = res.data;
              if (data && data.resultCode && data.resultCode == "0000") {
                commit("setUserName", data.data.userName);
                commit("avatarImgPath", data.data.avatarImgPath);
                commit("setHasGetInfo", true);
                resolve(data);
              }
              throw res;
            })
            .catch(err => {
              reject(err);
            });
        } catch (err) {
          reject(err);
        }
      });
    }
  }
};
