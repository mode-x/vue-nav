import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    }
  ]
});

export default router;
