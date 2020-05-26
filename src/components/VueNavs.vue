<template>
  <div id="vue-navs">
    <!-- Side Bar -->
    <side-bar
      :lib="lib"
      :side-bar-type="sideBarType"
      :show-side-bar="showSideBar"
      :side-bar-style="sideBarStyle"
      :user="user"
      :nav-bar-items="navBarItems"
      :side-bar-items="sideBarItems"
      @toggle-side-bar="toggleSideBar"
    >
      <template v-slot:info>
        <slot name="side-bar-info"></slot>
      </template>
    </side-bar>

    <!-- <div class="modal-background" style="display:none"></div> -->
    <!-- Nav Bar -->
    <nav-bar
      :lib="lib"
      :nav-bar-style="navBarStyle"
      :hamburger-type="hamburgerType"
      :site="site"
      :show-side-bar="showSideBar"
      :nav-bar-items="navBarItems"
      @toggle-side-bar="toggleSideBar"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "vue-navs",
  data() {
    return {
      showSideBar: false
    };
  },
  props: {
    lib: { type: String, default: "bulma" },
    hamburgerType: String,
    site: Object,
    user: Object,
    sideBarType: String,
    sideBarStyle: Object,
    navBarStyle: Object,
    sideBarItems: Array,
    navBarItems: Array
  },
  methods: {
    toggleSideBar() {
      document.getElementById("hamburger-btn").classList.toggle("is-active");
      this.showSideBar = !this.showSideBar;

      if (this.sideBarType != "below") {
        const navBar = document.getElementById("nav-bar");

        navBar.style.transitionProperty = "width";
        navBar.style.transitionDuration = "0.5s";

        if (navBar.getAttribute("data-open") === "false") {
          navBar.style.transitionTimingFunction = "ease";
          navBar.setAttribute("data-open", true);
        } else {
          navBar.style.transitionTimingFunction = "ease-in-out";
          navBar.setAttribute("data-open", false);
        }
      }
    },
    logOut() {
      this.$emit("log-out");
    }
  },
  components: {
    NavBar,
    SideBar
  }
};
</script>
