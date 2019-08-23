const express = require("express");
const replacestream = require("replacestream");

let port = 2048;
let mockServerPath = "/mock";

let mockServer = express();
let staticMiddleware = express.static("mock", {
  dotfiles: "ignore", //default ignore
  maxAge: 0 //default 0
});
mockServer.use(mockServerPath, function(req, res, next) {
  if (req.method !== "GET" || req.method !== "HEAD") {
    req.method = "GET";
  }
  staticMiddleware(req, res, next);
});
function startMockServer() {
  mockServer.listen(port);
}
function generateProxyConfig(appContext) {
  let proxyConfig = {};
  let appContextRegExp = new RegExp(`^${appContext}(.*)$`);
  let target = `http://localhost:${port}`;
  function pathRewrite(requestPath) {
    return requestPath.replace(appContextRegExp, `${mockServerPath}$1`);
  }
  proxyConfig[`${appContext}/static`] = {
    target,
    pathRewrite
  };
  proxyConfig[`${appContext}/api`] = proxyConfig[
    `${appContext}/security/api`
  ] = {
    target,
    pathRewrite,
    selfHandleResponse: true,
    onProxyRes(proxyRes, req, res) {
      let contentype = proxyRes.headers["content-type"];
      if (/json/.test(contentype)) {
        res.set("content-type", proxyRes.headers["content-type"]);
        proxyRes.pipe(replacestream("${appContext}", appContext)).pipe(res);
      }
    }
  };
  return proxyConfig;
}

module.exports = {
  startMockServer,
  generateProxyConfig
};
