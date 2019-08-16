import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import VueNav from "@/components/VueNav";

import "@/assets/css/bulma.scss";

Vue.component("vue-nav", VueNav);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
