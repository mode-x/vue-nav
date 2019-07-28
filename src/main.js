import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavBar from "@/components/NavBar";

import "@/assets/css/bulma.scss";

Vue.component("nav-bar", NavBar);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTv,
  faHome,
  faChartPie,
  faDollarSign,
  faQuestion,
  faUniversity,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUsers,
  faCog
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTv,
  faHome,
  faChartPie,
  faDollarSign,
  faQuestion,
  faUniversity,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUsers,
  faCog
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
