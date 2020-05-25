<template>
<div id="nav-bar" v-bind:style="navBar" class="navbar" data-open="false">
      <!-- Hamburger button -->
      <button
        id="hamburger-btn"
        :class="`hamburger ${hamburgerType} navbar-item`"
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        @click="$emit('toggle-side-bar')"
        v-if="loggedIn"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <div id="nav-menu-container">
        <div>Login</div>
      </div>
    </div>
</template>

<script>
// import NavMenuItem from "@/components/NavMenuItem.vue";

export default {
  name: "NavBar",
  props: {
    hamburgerType: String,
    loggedIn: Boolean,
    site: Object,
    loggedInItems: Array,
    loggedOutItems: Array,
    navBar: Object
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );
      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  },
  components: {
    // NavMenuItem
  }
};
</script>

<style lang="scss">
#nav-menu-container{
  display: flex;
  flex-direction: row-reverse;
  align-content: right;
  justify-content: right;
}
.navbar {
  float: right;
}
</style>
