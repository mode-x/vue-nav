<template>
  <div id="vue-navs">
    <!-- Side Bar -->
      <transition name="side-bar">
        <div id="side-bar" v-if="show" v-bind:style="sideBar">Side Bar</div>
      </transition>
    
    <!-- <side-baru
      :lib="lib"
      :user="user"
      :menu-items="menuItems"
      @toggle-side-bar="toggleSideBar"
      @log-out="logOut"
    /> -->
    <!-- <div class="modal-background" style="display:none"></div> -->
    <!-- Nav Bar -->
    <nav-bar
      :lib="lib"
      :nav-bar="navBar"
      :hamburger-type="hamburgerType"
      :site="site"
      :logged-in="loggedIn"
      :logged-in-items="loggedInItems"
      :logged-out-items="loggedOutItems"
      @toggle-side-bar="toggleSideBar"
      @log-out="logOut"
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
      show: false,
      sideBar: {
        width: "0px",
        height: "100%",
        backgroundColor: "#000",
        position: "fixed",
        zIndex: 1000,
        overflow: "auto",
        top: this.sideBarTopOffset,
        boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)`
      }
    };
  },
  props: {
    lib: { type: String, default: "bulma" },
    hamburgerType: String,
    loggedIn: Boolean,
    site: Object,
    user: Object,
    menuItems: Array,
    sideBarTopOffset: {
      type: String,
      default: "80px"
    },
    sideBarType: {
      type: String,
      default: "below-header"
    },
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
    },
    navBar: {
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "80px",
          padding: "10px",
          opacity: "0.8",
          background: `linear-gradient(to right, rgb(129, 184, 230), rgb(255, 255, 255))`
        };
      }
    }
  },
  computed(){

  },
  methods: {
    toggleSideBar() {
      document.getElementById("hamburger-btn").classList.toggle("is-active");
      this.show = !this.show;
      this.sideBar.width = "250px";

      const navBar = document.getElementById("nav-bar");

      console.log(navBar.clientHeight)

      // navBar.style.transitionProperty = "width"
      // navBar.style.transitionDuration= "0.5s"

      // if (navBar.getAttribute("data-open") === "false"){
      //   navBar.style.transitionTimingFunction = "ease"
      //   navBar.style.width = `${navBar.clientWidth - 250}px`
      //   navBar.setAttribute("data-open", true);
      // }else{
      //   navBar.style.transitionTimingFunction = "ease-in-out"
      //   navBar.style.width = "100%"
      //   navBar.setAttribute("data-open", false);
      // }
    },
    logOut() {
      this.$emit("log-out");
      if (document.getElementById("nav").getAttribute("data-open") === "true") {
        document.getElementById("hamburger-btn").click();
      }
    },
  },
  components: {
    NavBar,
    // SideBar
  }
};
</script>

<style lang="scss">
.side-bar-enter-active {
  animation: side-bar 0.5s;
}
.side-bar-leave-active {
  animation: side-bar 0.5s ease-in-out reverse;
}
@keyframes side-bar {
  from {
    width: 0px;
  }
  to {
    width: 250px;
  }
}
</style>
