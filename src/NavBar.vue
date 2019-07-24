<template>
  <div id="nav-bar">
    <div
      class="sidebar animate-left"
      style="display:none"
      id="sidebar"
    >
      <aside class="menu">
        <p class="menu-label">Menu</p>
        <div class="has-text-centered">
          <figure class="image is-64x64 is-inline-block">
            <img
              class="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </figure>
        </div>
        <hr />
        <p class="school-info has-background-grey-lighter">
          {{ email }} | {{ role }}
        </p>
        <p class="school-info has-background-grey-lighter">
          {{ subscriptionStatus }}
        </p>
        <p class="school-info has-background-grey-lighter">
          {{ daysRemaining }}
        </p>
        <hr />
        <template v-if="role === 'admin'">
          <ul class="menu-list">
            <li
              v-for="menu_item in admin_menu_items"
              :key="menu_item.header_title"
            >
              <router-link
                :to="menu_item.header_route"
                v-on:click.native="openSubMenu"
              >
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <font-awesome-icon
                      :icon="[menu_item.icon_type, menu_item.icon_name]"
                      size="lg"
                    />
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
        <template v-else-if="role === 'educator'">
          <ul class="menu-list">
            <li
              v-for="menu_item in educator_menu_items"
              :key="menu_item.header_title"
            >
              <router-link
                :to="menu_item.header_route"
                v-on:click.native="openSubMenu"
              >
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <font-awesome-icon
                      :icon="[menu_item.icon_type, menu_item.icon_name]"
                      size="lg"
                    />
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
    <nav id="nav" class="navbar is-transparent is-fixed-top" data-open="false">
      <div class="navbar-brand">
        <button
          id="hamburger-btn"
          class="hamburger hamburger--spin navbar-item"
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
        <template v-if="!loggedIn">
          <router-link class="navbar-item" to="/">SIMSED</router-link>
        </template>
        <template v-else>
          <router-link class="navbar-item" to="/">
            <p class="title is-4" style="padding-bottom: 8px">
              {{ school.name }}
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
                        <font-awesome-icon icon="user" size="lg" />
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
                        <font-awesome-icon icon="sign-out-alt" size="lg" />
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
            <div class="columns">
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/" class="nav-menu-item">
                      <span class="icon">
                        <font-awesome-icon icon="home" size="lg" />
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
                        <font-awesome-icon icon="chart-pie" size="lg" />
                      </span>
                      <p class="heading">Features</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/login-in" class="nav-menu-item">
                      <span class="icon">
                        <font-awesome-icon icon="dollar-sign" size="lg" />
                      </span>
                      <p class="heading">Pricing</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <router-link to="/login-in" class="nav-menu-item">
                      <span class="icon">
                        <font-awesome-icon icon="question" size="lg" />
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
                        <font-awesome-icon icon="university" size="lg" />
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
                        <font-awesome-icon icon="sign-in-alt" size="lg" />
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
  name: "nav-bar",
  data() {
    return {
      is_menu_open: false,
      is_sub_menu_open: false,
      admin_menu_items: [
        {
          header_title: "Dashboard",
          header_route: "/dashboard",
          icon_type: "fas",
          icon_name: "tv"
        },
        {
          header_title: "Billing",
          header_route: "/subscription",
          icon_type: "fab",
          icon_name: "cc-amazon-pay"
        },
        {
          header_title: "Structure",
          header_route: "/",
          icon_type: "fas",
          icon_name: "cubes",
          sub_menus: [
            { name: "Terms", route: "/terms" },
            { name: "Class Groups", route: "/class_groups" },
            { name: "School Classes", route: "/school_classes" },
            { name: "Subjects", route: "/subjects" },
            { name: "Assigned Subjects", route: "/assigned_subjects" },
            { name: "Assigned Classes", route: "/assigned_classes" }
          ]
        },
        {
          header_title: "Users",
          header_route: "/",
          icon_type: "fas",
          icon_name: "users",
          sub_menus: [
            { name: "Users", route: "/terms" },
            { name: "Administrators", route: "/" },
            { name: "Educators", route: "/educators" },
            { name: "Parents", route: "/students" },
            { name: "Students", route: "/students" }
          ]
        },
        {
          header_title: "Results",
          header_route: "/",
          icon_type: "fas",
          icon_name: "file-alt",
          sub_menus: [
            { name: "ATE Results", route: "/terms" },
            { name: "ATE Comments", route: "/" },
            { name: "ATE Psychomotor", route: "/educators" },
            { name: "ATE Attendance", route: "/students" },
            { name: "Result Publisher", route: "/students" }
          ]
        },
        {
          header_title: "Preferences",
          header_route: "/",
          icon_type: "fas",
          icon_name: "cog",
          sub_menus: [
            { name: "School", route: "/terms" },
            { name: "School Calendar", route: "/terms" },
            { name: "Grading scales", route: "/" },
            { name: "Graduates", route: "/educators" },
            { name: "Promote Students", route: "/students" },
            { name: "Withdrawals", route: "/students" },
            { name: "School Settings", route: "/students" },
            { name: "Results Header", route: "/students" },
            { name: "ATES", route: "/students" },
            { name: "ATES Policy", route: "/ate_policy" }
          ]
        }
      ],
      educator_menu_items: [
        {
          header_title: "Dashboard",
          header_route: "/dashboard",
          icon_type: "fas",
          icon_name: "tv"
        },
        {
          header_title: "New ATE",
          header_route: "/new_ate",
          icon_type: "fab",
          icon_name: "cc-amazon-pay"
        },
        {
          header_title: "ATE Unmarked",
          header_route: "/ate_unmarked",
          icon_type: "fab",
          icon_name: "cc-amazon-pay"
        },
        {
          header_title: "ATE Result",
          header_route: "/",
          icon_type: "fas",
          icon_name: "cubes",
          sub_menus: [
            { name: "Result Scores", route: "/terms" },
            { name: "Result Comments", route: "/class_groups" },
            { name: "Result Psychomotors", route: "/school_classes" },
            { name: "Result Attendance", route: "/subjects" }
          ]
        }
      ]
    };
  },
  props: {
    loggedIn: Boolean,
    school: Object,
    email: String,
    role: String,
    subscriptionStatus: String,
    daysRemaining: String
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
      let items = this.admin_menu_items;
      if (this.role === "educator") {
        items = this.educator_menu_items;
      }
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
      if (this.is_menu_open) {
        document.getElementById("nav").style.marginLeft = "0px";
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("nav").setAttribute("data-open", "false");
      } else {
        document.getElementById("nav").style.marginLeft = "280px";
        document.getElementById("sidebar").style.width = "280px";
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("nav").setAttribute("data-open", "true");
      }
      this.is_menu_open = !this.is_menu_open;
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
$hamburger-layer-width: 30px;

@import "./node_modules/hamburgers/_sass/hamburgers/hamburgers";

a {
  padding-right: 25px;
}

a:hover {
  color: orange;
}

.school-info {
  font-size: 0.85em;
  padding: 5px;
  margin-bottom: 5px;
}

#nav {
  opacity: 0.8;
  background: linear-gradient(to right, rgb(144, 202, 249), rgb(255, 255, 255));
}

p.icon,
p.heading {
  color: rgb(40, 42, 44);
  // color: rgb(16, 141, 243);
}

#sidebar {
  height: 100%;
  width: 200px;
  background-color: #ffffff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  top: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.animate-left {
  position: relative;
  animation: animateleft 0.4s;
}
@keyframes animateleft {
  from {
    left: -300px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}

#nav {
  animation: animateleft 0.6s;
}
@keyframes animateleft {
  from {
    left: -300px;
    opacity: 0;
  }
  to {
    left: 0px;
    opacity: 1;
  }
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
