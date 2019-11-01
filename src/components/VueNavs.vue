<template>
  <div id="vue-navs">
    <!-- Side Bar -->
    <side-bar
      :lib="lib"
      :user="user"
      :menu-items="menuItems"
      @toggle-menu="toggleMenu"
      @log-out="logOut"
    />
    <!-- <div class="modal-background" style="display:none"></div> -->
    <!-- Nav Bar -->
    <nav-bar
      :lib="lib"
      :hamburger-type="hamburgerType"
      :site="site"
      :logged-in="loggedIn"
      :logged-in-items="loggedInItems"
      :logged-out-items="loggedOutItems"
      @toggle-menu="toggleMenu"
      @log-out="logOut"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "vue-navs",
  props: {
    lib: { type: String, default: "bulma" },
    hamburgerType: String,
    loggedIn: Boolean,
    site: Object,
    user: Object,
    menuItems: Array,
    loggedInItems: {
      type: Array,
      default: () => {
        return [{ name: "Account", icon: "fas fa-user", route: "/account" }];
      }
    },
    loggedOutItems: {
      type: Array,
      default: () => {
        return [
          { name: "Home", icon: "fas fa-home", route: "/" },
          { name: "Faq", icon: "fas fa-question", route: "/" },
          { name: "Log In", icon: "fas fa-sign-in-alt", route: "/" }
        ];
      }
    }
  },
  methods: {
    logOut() {
      this.$emit("log-out");
      if (document.getElementById("nav").getAttribute("data-open") === "true") {
        document.getElementById("hamburger-btn").click();
      }
    },
    toggleMenu() {
      document.getElementById("hamburger-btn").classList.toggle("is-active");
      const nav = document.getElementById("nav");
      const sidebar = document.getElementById("sidebar");
      // const overlay = document.getElementsByClassName("modal-background")[0];
      if (this.is_side_bar_open) {
        nav.style.marginLeft = "0px";
        nav.setAttribute("data-open", "false");
        sidebar.style.display = "none";
        // overlay.style.display = "none";
      } else {
        // overlay.style.marginLeft = "250px";
        // overlay.style.display = "block";
        sidebar.style.width = "250px";
        sidebar.style.display = "block";
        nav.style.marginLeft = "250px";
        nav.setAttribute("data-open", "true");
      }
      this.is_side_bar_open = !this.is_side_bar_open;
    }
  },
  components: {
    NavBar,
    SideBar
  }
};
</script>

<style lang="scss">
@keyframes animateleft {
  from {
    left: -250px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}
</style>
