import Vue from "vue";
import VueNavs from "./VueNavs.vue";

const Components = {
  VueNavs
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
