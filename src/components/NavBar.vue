<template>
  <div id="nav-container">
    <transition name="side-bar-container">
      <div
        id="side-bar-container"
        v-if="showSideBar"
        v-bind:style="sideBarContainerStyle"
      ></div>
    </transition>
    <div id="nav-bar" v-bind:style="navBarStyle" data-open="false">
      <div class="columns is-gapless is-mobile">
        <!-- Hamburger button -->
        <div class="column is-narrow">
          <button
            id="hamburger-btn"
            :class="`hamburger ${hamburgerType} navbar-item`"
            type="button"
            aria-label="Menu"
            aria-controls="navigation"
            @click="$emit('toggle-side-bar')"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div class="column">
          <router-link to="/">
            <p class="title is-4" style="padding: 5px;">
              {{ site.name }}
            </p>
          </router-link>
        </div>
        <div class="column is-narrow is-hidden-touch">
          <div class="columns">
            <div
              v-for="navBarItem in navBarItems"
              :key="navBarItem.name"
              class="column is-narrow"
            >
              <nav-menu-item
                :name="navBarItem.name"
                :icon="navBarItem.icon"
                :route="navBarItem.route"
                :action="navBarItem.action"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenuItem from "@/components/NavMenuItem.vue";

export default {
  name: "NavBar",
  data() {
    return {
      sideBarContainerStyle: {
        minWidth: "0px",
        height: "80px",
        backgroundColor: "#000"
      }
    };
  },
  props: {
    hamburgerType: String,
    site: Object,
    showSideBar: Boolean,
    navBarItems: Array,
    navBarStyle: {
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "80px",
          padding: "10px",
          opacity: "0.8",
          background: `linear-gradient(to right, rgb(129, 184, 230), rgb(255, 255, 255))`,
          float: "right"
        };
      }
    }
  },
  watch: {
    showSideBar(n, o) {
      if (n) {
        this.sideBarContainerStyle.minWidth = "250px";
      } else {
        this.sideBarContainerStyle.minWidth = "0px";
      }
    }
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

<style lang="scss" scoped>
#nav-container {
  display: flex;
  flex-direction: row;
}

#nav-container > #side-bar-container {
  min-width: 250px;
}

#nav-container > #nav-bar {
  flex: auto;
}

.side-bar-container-enter-active {
  animation: side-bar-container 0.5s;
}
.side-bar-container-leave-active {
  animation: side-bar-container 0.5s ease-in-out reverse;
}
@keyframes side-bar-container {
  from {
    min-width: 0px;
  }
  to {
    min-width: 250px;
  }
}
</style>
