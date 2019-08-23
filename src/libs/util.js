import service from "@/utils/http.js";
export const setToken = token => {
  window.sessionStorage.setItem("token", token);
};
export const getToken = async () => {
  let lettoken = window.sessionStorage.getItem("token");
  if (lettoken) {
    return lettoken;
  } else {
    return await service("/login/check.json", {})
      .then(res => {
        const data = res.data;
        if (data && data.resultCode && data.resultCode == "0000") {
          setToken("sign-in");
          return "sign-in";
        }
      })
      .catch(() => {
        return false;
      });
  }
};
