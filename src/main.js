import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import VueNavs from "@/components/VueNavs";

import "@/assets/css/bulma.scss";

Vue.component("vue-navs", VueNavs);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
