<template>
  <nav id="nav" class="navbar is-fixed-top" data-open="false">
    <div class="navbar-brand">
      <!-- Hamburger button -->
      <button
        id="hamburger-btn"
        :class="`hamburger ${hamburgerType} navbar-item`"
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        @click="$emit('toggle-menu')"
        v-if="loggedIn"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <!-- Nav Bar content -->
      <template v-if="!loggedIn">
        <router-link class="navbar-item" to="/">
          <p class="title is-4" style="padding-bottom: 8px">{{ site.brand }}</p>
        </router-link>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </template>
      <template v-else>
        <router-link class="navbar-item" to="/">
          <p class="title is-4" style="padding-bottom: 8px">{{ site.name }}</p>
        </router-link>
        <div
          class="navbar-burger burger is-hidden-touch"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </template>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-end" v-if="loggedIn">
        <div class="navbar-item">
          <!-- Slot for logged in menu items -->
          <div class="columns">
            <div
              v-for="loggedInItem in loggedInItems"
              :key="loggedInItem.name"
              class="column"
            >
              <nav-menu-item
                :name="loggedInItem.name"
                :icon="loggedInItem.icon"
                :route="loggedInItem.route"
              />
            </div>
            <div class="column">
              <nav-menu-item
                name="Log Out"
                icon="fas fa-sign-out-alt"
                @click.native="$emit('log-out')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end" v-else>
        <div class="navbar-item">
          <!-- Slot for logged out menu items -->
          <div class="columns">
            <div
              v-for="loggedOutItem in loggedOutItems"
              :key="loggedOutItem.name"
              class="column"
            >
              <nav-menu-item
                :name="loggedOutItem.name"
                :icon="loggedOutItem.icon"
                :route="loggedOutItem.route"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavMenuItem from "@/components/NavMenuItem.vue";

export default {
  name: "NavBar",
  props: {
    hamburgerType: String,
    loggedIn: Boolean,
    site: Object,
    loggedInItems: Array,
    loggedOutItems: Array
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
    NavMenuItem
  }
};
</script>

<style lang="scss">
.navbar {
  padding: 10px;
  opacity: 0.8;
  position: relative;
  background: linear-gradient(to right, rgb(129, 184, 230), rgb(255, 255, 255));
  animation: animateleft 0.6s;
}
</style>
