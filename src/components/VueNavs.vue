<template>
  <div id="vue-navs">
    <!-- Side Bar -->
    <div id="sidebar" style="display:none">
      <!-- Menu -->
      <aside>
        <div class="side-bar-header">
          <slot name="avatar">
            <div class="side-bar-header-avatar">
              <p class="menu-label">Menu</p>
              <div class="has-text-centered">
                <figure class="image is-64x64 is-inline-block">
                  <img class="is-rounded" :src="user.avatar" />
                </figure>
              </div>
            </div>
          </slot>
          <slot name="info">
            <div class="side-bar-header-info">
              <slot>
                <hr />
                <p class="user-info has-background-grey-lighter">
                  {{ user.email }} | {{ user.role }}
                </p>
                <hr />
              </slot>
            </div>
          </slot>
        </div>
        <!-- Menu items-->
        <menu-item :menu-items="menuItems" v-on:toggle-menu="toggleMenu" />
        <!-- Logged In menu -->
        <hr />
        <div class="is-hidden-desktop">
          <ul class="menu-list">
            <li v-for="loggedInItem in loggedInItems" :key="loggedInItem.name">
              <router-link :to="loggedInItem.route">
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <span class="icon">
                      <i :class="loggedInItem.icon" size="lg"></i>
                    </span>
                  </div>
                  <div class="is-pulled-left" style="width: 86%">
                    {{ loggedInItem.name }}
                  </div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="#" @click.native="logOut()">
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <span class="icon">
                      <i class="fas fa-sign-out-alt" size="lg"></i>
                    </span>
                  </div>
                  <div class="is-pulled-left" style="width: 86%">Log Out</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
    <!-- Nav Bar -->
    <nav id="nav" class="navbar is-transparent is-fixed-top" data-open="false">
      <div class="navbar-brand">
        <!-- Hamburger button -->
        <button
          id="hamburger-btn"
          :class="`hamburger ${hamburgerType} navbar-item`"
          type="button"
          aria-label="Menu"
          aria-controls="navigation"
          @click="toggleMenu"
          v-if="loggedIn"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <!-- Nav Bar content -->
        <template v-if="!loggedIn">
          <router-link class="navbar-item" to="/">{{ site.name }}</router-link>
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
            <p class="title is-4" style="padding-bottom: 8px">
              {{ site.name }}
            </p>
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
                  @click.native="logOut()"
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
  </div>
</template>

<script>
import NavMenuItem from "@/components/NavMenuItem.vue";
import MenuItem from "@/components/MenuItem.vue";

export default {
  name: "vue-navs",
  data() {
    return {
      is_side_bar_open: false
    };
  },
  props: {
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
    openSubMenu(e) {
      const header_title = e.target.innerText;
      let items = this.menuItems;
      const menus = items.filter(
        menu_item =>
          menu_item.sub_menus && menu_item.header_title === header_title
      );

      if (menus.length === 0) {
        document.getElementById("hamburger-btn").click();
        // Close others
        const others = document.getElementsByClassName("sub-menu");
        for (let i = 0; i < others.length; i++) {
          const element = others[i];
          document.getElementById(element.getAttribute("id")).style.display =
            "none";
          document
            .getElementById(element.getAttribute("id"))
            .setAttribute("data-open", "false");
        }
        return;
      } else {
        const id = `${header_title.toLowerCase().replace(/\W/gi, "-")}-items`;
        const isOpened = document.getElementById(id).getAttribute("data-open");
        if (isOpened === "true") {
          document.getElementById(id).style.display = "none";
          document.getElementById(id).setAttribute("data-open", "false");
        } else {
          document.getElementById(id).style.display = "block";
          document.getElementById(id).setAttribute("data-open", "true");
          // Close others
          const others = document.getElementsByClassName("sub-menu");
          for (let i = 0; i < others.length; i++) {
            const element = others[i];
            if (
              element.getAttribute("data-parent") !==
              header_title.toLowerCase().replace(/\W/gi, "-")
            ) {
              document.getElementById(
                element.getAttribute("id")
              ).style.display = "none";
              document
                .getElementById(element.getAttribute("id"))
                .setAttribute("data-open", "false");
            }
          }
        }
      }
    },
    toggleMenu() {
      document.getElementById("hamburger-btn").classList.toggle("is-active");
      const nav = document.getElementById("nav");
      const sidebar = document.getElementById("sidebar");
      if (this.is_side_bar_open) {
        nav.style.marginLeft = "0px";
        nav.setAttribute("data-open", "false");
        sidebar.style.display = "none";
      } else {
        sidebar.style.width = "250px";
        sidebar.style.display = "block";
        nav.style.marginLeft = "250px";
        nav.setAttribute("data-open", "true");
      }
      this.is_side_bar_open = !this.is_side_bar_open;
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
    NavMenuItem,
    MenuItem
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  font-size: 0.85em;
  padding: 5px;
  margin-bottom: 5px;
}

.side-bar-header {
  padding: 16px 16px 0px 16px;
}

#sidebar {
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  top: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  animation: animateleft 0.6s;
}

#nav {
  padding: 10px;
  opacity: 0.8;
  position: relative;
  background: linear-gradient(to right, rgb(144, 202, 249), rgb(255, 255, 255));
  animation: animateleft 0.6s;
}

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
