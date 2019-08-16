import Vue from "vue";
import VueNav from "./VueNav.vue";

import "@/assets/css/bulma.scss";

const Components = {
  VueNav
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
