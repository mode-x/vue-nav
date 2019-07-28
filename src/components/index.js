import Vue from "vue";
import NavBar from "./NavBar.vue";

const Components = {
  NavBar
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
