//可以将axios封装一下，把所有接口路径统一写在一个地方，用name去调用接口
export let appContext =
  window.base || `${window.location.pathname.split("/")[1]}`;
export let apenApiContext = `${appContext}/api`;
export let authApiContext = `${appContext}/security/api`;

let list = [
  {
    name: "name1",
    url: "url1",
    methos: "post",
    baseURL: "base1"
  },
  {
    name: "name2",
    url: "url2",
    methos: "get",
    baseURL: "base2"
  }
];

export default {
  apenApiContext,
  authApiContext,
  list
};
