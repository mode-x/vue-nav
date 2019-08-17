<template>
  <div id="vue-navs">
    <!-- Side Bar -->
    <div id="sidebar" style="display:none">
      <!-- Menu -->
      <aside class="menu">
        <p class="menu-label">Menu</p>
        <div class="has-text-centered">
          <figure class="image is-64x64 is-inline-block">
            <img class="is-rounded" :src="user.avatar" />
          </figure>
        </div>
        <hr />
        <p class="user-info has-background-grey-lighter">
          {{ user.email }} | {{ user.role }}
        </p>
        <hr />
        <!-- Menu items-->
        <template>
          <ul class="menu-list">
            <li v-for="menu_item in menuItems" :key="menu_item.header_title">
              <router-link
                :to="menu_item.header_route"
                v-on:click.native="openSubMenu"
              >
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <span class="icon">
                      <i
                        :class="`${menu_item.icon_type} ${menu_item.icon_name}`"
                        size="lg"
                      ></i>
                    </span>
                  </div>
                  <div class="is-pulled-left" style="width: 86%">
                    {{ menu_item.header_title }}
                  </div>
                </div>
              </router-link>
              <div
                :id="
                  `${menu_item.header_title
                    .toLowerCase()
                    .replace(/\W/gi, '-')}-items`
                "
                class="sub-menu"
                style="display:none"
                v-if="menu_item.hasOwnProperty('sub_menus')"
                data-open="false"
                :data-parent="
                  `${menu_item.header_title.toLowerCase().replace(/\W/gi, '-')}`
                "
              >
                <ul>
                  <li
                    v-for="sub_menu_item in menu_item.sub_menus"
                    :key="sub_menu_item.name"
                  >
                    <router-link
                      :id="
                        `${sub_menu_item.name
                          .toLowerCase()
                          .replace(/\W/gi, '-')}-sub-menu-items`
                      "
                      :to="sub_menu_item.route"
                      v-on:click.native="toggleMenu"
                      >{{ sub_menu_item.name }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </template>
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
          <router-link class="navbar-item" to="/">VUE NAVS</router-link>
        </template>
        <template v-else>
          <router-link class="navbar-item" to="/">
            <p class="title is-4" style="padding-bottom: 8px">
              {{ site.name }}
            </p>
          </router-link>
        </template>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end" v-if="loggedIn">
          <div class="navbar-item">
            <!-- Slot for logged in menu items -->
            <div class="columns">
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <a
                      href="#"
                      @click="logOut"
                      class="nav-menu-item has-dropdown is-hoverable"
                    >
                      <p class="icon">
                        <i class="fas fa-user" size="lg"></i>
                      </p>
                      <p class="heading">Account</p>
                    </a>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <a href="#" @click="logOut" class="nav-menu-item">
                      <p class="icon">
                        <i class="fas fa-sign-out-alt" size="lg"></i>
                      </p>
                      <p class="heading">Log Out</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-else>
          <div class="navbar-item">
            <!-- Slot for logged out menu items -->
            <div class="columns">
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/" class="nav-menu-item">
                      <span class="icon">
                        <i class="fas fa-home" size="lg"></i>
                      </span>
                      <p class="heading">Home</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/welcome" class="nav-menu-item">
                      <span class="icon">
                        <i class="fas fa-chart-pie" size="lg"></i>
                      </span>
                      <p class="heading">Features</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/pricing" class="nav-menu-item">
                      <span class="icon">
                        <i class="fas fa-dollar-sign" size="lg"></i>
                      </span>
                      <p class="heading">Pricing</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/faq" class="nav-menu-item">
                      <span class="icon">
                        <i class="fas fa-question" size="lg"></i>
                      </span>
                      <p class="heading">FAQ</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/register" class="nav-menu-item">
                      <span class="icon">
                        <i class="fas fa-university" size="lg"></i>
                      </span>
                      <p class="heading">Register</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/login_in" class="nav-menu-item">
                      <p class="icon">
                        <i class="fas fa-sign-in-alt" size="lg"></i>
                      </p>
                      <p class="heading">Log In</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "vue-navs",
  data() {
    return {
      is_side_bar_open: false,
      is_sub_menu_open: false
    };
  },
  props: {
    hamburgerType: String,
    loggedIn: Boolean,
    site: Object,
    user: Object,
    menuItems: Array
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
  }
};
</script>

<style lang="scss" scoped>
// a {
//   padding-right: 25px;
// }

// a:hover {
//   color: rgb(92, 255, 127);
// }

.user-info {
  font-size: 0.85em;
  padding: 5px;
  margin-bottom: 5px;
}

p.icon,
p.heading {
  color: rgb(40, 42, 44);
}

.menu {
  padding: 16px;
}

.sub-menu {
  animation-name: slideDown;
  -webkit-animation-name: slideDown;

  animation-duration: 1s;
  -webkit-animation-duration: 1s;

  animation-timing-function: ease;
  -webkit-animation-timing-function: ease;

  visibility: visible !important;
}

.animateNavleft {
  animation-name: animateNavleft;
  animation-duration: 0.6s;
  animation-timing-function: ease;
  visibility: visible !important;
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
  opacity: 0.8;
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

@keyframes animateNavleft {
  0% {
    margin-left: -250px;
    opacity: 0;
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(8%);
    opacity: 0.35;
  }
  65% {
    transform: translateY(-4%);
    opacity: 0.5;
  }
  80% {
    transform: translateY(4%);
    opacity: 0.6;
  }
  95% {
    -webkit-transform: translateY(-2%);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@-webkit-keyframes slideDown {
  0% {
    -webkit-transform: translateY(-100%);
  }
  50% {
    -webkit-transform: translateY(8%);
  }
  65% {
    -webkit-transform: translateY(-4%);
  }
  80% {
    -webkit-transform: translateY(4%);
  }
  95% {
    -webkit-transform: translateY(-2%);
  }
  100% {
    -webkit-transform: translateY(0%);
  }
}
</style>
