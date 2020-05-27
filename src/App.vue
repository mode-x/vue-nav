<template>
  <div id="app">
    <vue-navs
      :site="site"
      :user="user"
      :side-bar-type="side_bar_type"
      :side-bar-items="side_bar_items"
      :nav-bar-items="nav_bar_items"
      :component-key="user.role"
    >
      <template v-slot:side-bar-info>
        <hr />
        <p class="user-slot has-background-grey-lighter">
          {{ user.email }} | {{ user.role }}
        </p>
        <p class="user-slot has-background-grey-lighter">
          Second Term 2019 - 2020
        </p>
        <p class="user-slot has-background-grey-lighter">120 days remaining</p>
        <hr />
      </template>
    </vue-navs>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      site: { name: "Pidasys" },
      user: {
        email: "mode-x@github.com",
        role: "admin",
        avatar: "https://bulma.io/images/placeholders/128x128.png"
      },
      side_bar_type: "above",
      side_bar_items: [
        {
          name: "Dashboard",
          icon: "fas fa-tv",
          route: "/dashboard"
        },
        {
          name: "Billing",
          icon: "fas fa-dollar-sign",
          route: "/billing"
        },
        {
          name: "Users",
          icon: "fas fa-users",
          route: "#",
          open_menu: false,
          sub_menus: [
            { name: "Users", route: "/users" },
            { name: "Administrators", route: "/admin" }
          ]
        },
        {
          name: "Preferences",
          icon: "fas fa-cog",
          route: "/",
          open_menu: false,
          sub_menus: [{ name: "Settings", route: "/settings" }]
        }
      ],
      nav_bar_items: [
        { name: "Profile", icon: "fas fa-user", route: "/profile" },
        { name: "Setting", icon: "fas fa-cog", route: "/setting" },
        {
          name: "Logout",
          icon: "fas fa-sign-out-alt",
          route: "/home",
          action: () => {
            this.logOut();
          }
        }
      ]
    };
  },
  methods: {
    logOut() {
      alert("Logged out!!!");
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.user-slot {
  font-size: 0.85em;
  padding: 5px;
  margin-bottom: 10px;
}

a.nav-menu-item:hover {
  color: orange;
}

.menu-list a {
  color: #a8a8a8 !important;
}

.menu-list a:hover {
  background-color: orange !important;
  color: #2c2c2c !important;
}
</style>
