<template>
  <div id="app">
    <vue-navs
      :hamburger-type="hamburger_type"
      :logged-in="logged_in"
      :site="site"
      :user="user"
      v-on:log-out="logOut"
      :menu-items="menu_items"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      hamburger_type: "hamburger--spin",
      logged_in: true,
      site: { name: "Pidasys" },
      user: {
        email: "myemail@github.com",
        role: "admin",
        avatar: "https://bulma.io/images/placeholders/128x128.png"
      },

      menu_items: [
        {
          header_title: "Dashboard",
          header_route: "/dashboard",
          icon_type: "fas",
          icon_name: "fa-tv"
        },
        {
          header_title: "Billing",
          header_route: "/billing",
          icon_type: "fas",
          icon_name: "fa-dollar-sign"
        },
        {
          header_title: "Users",
          header_route: "/",
          icon_type: "fas",
          icon_name: "fa-users",
          sub_menus: [
            { name: "Users", route: "/users" },
            { name: "Administrators", route: "/admin" }
          ]
        },
        {
          header_title: "Preferences",
          header_route: "/",
          icon_type: "fas",
          icon_name: "fa-cog",
          sub_menus: [{ name: "Settings", route: "/settings" }]
        }
      ]
    };
  },
  methods: {
    logOut() {
      this.logged_in = !this.logged_in;
    }
  }
};
</script>
