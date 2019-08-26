import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $axios from "./utils/http.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import demoplugin from "./plugins/demo-plugin";
import democonfig from "./configs/demo-config";
// import locale from "element-ui/lib/locale/lang/en";

Vue.prototype.$service = $axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(demoplugin, democonfig);
// Vue.use(ElementUI, { locale })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
