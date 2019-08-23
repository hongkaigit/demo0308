const path = require("path");
const proxyConfig = require("./vue.config.proxy.js");
function resolve(dir) {
  return path.join(__dirname, dir);
}
let appContext = process.env.APP_CONTEXT;
let proxy = proxyConfig.generateProxyConfig(appContext);

proxy[`${appContext}(/security)?/api/*`] = {
  target: "http://192.168.1.1:8080", //乱写的，真实案例请写正确的
  changeOrigin: true
};
module.exports = {
  // publicPath: "/myvue/",
  devServer: {
    //   "/api": {
    //     target: "https://localhost:8080",
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       "^api": ""
    //     }
    //   }
    // }
    proxy,
    before() {
      proxyConfig.startMockServer();
    }
  },
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@com", resolve("src/components"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"));
  }
};
