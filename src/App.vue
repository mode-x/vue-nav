<template>
  <div id="app">
    <vue-navs
      :lib="lib"
      :hamburger-type="hamburger_type"
      :logged-in="logged_in"
      :site="site"
      :user="user"
      :menu-items="menu_items"
      :logged-in-items="logged_in_items"
      :logged-out-items="logged_out_items"
      @log-out="logOut"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      lib: "bulma",
      hamburger_type: "hamburger--spin",
      logged_in: true,
      site: { name: "Pidasys", brand: "VUE NAVS" },
      user: {
        email: "myemail@github.com",
        role: "admin",
        avatar: "https://bulma.io/images/placeholders/128x128.png"
      },

      menu_items: [
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
          route: "/",
          sub_menus: [
            { name: "Users", route: "/users" },
            { name: "Administrators", route: "/admin" }
          ]
        },
        {
          name: "Preferences",
          icon: "fas fa-cog",
          route: "/",
          sub_menus: [{ name: "Settings", route: "/settings" }]
        }
      ],
      logged_in_items: [
        { name: "Profile", icon: "fas fa-user", route: "/profile" },
        { name: "Setting", icon: "fas fa-cog", route: "/setting" }
      ],
      logged_out_items: [
        { name: "Home", icon: "fas fa-home", route: "/" },
        { name: "Faq", icon: "fas fa-question", route: "/faq" },
        { name: "Log In", icon: "fas fa-sign-in-alt", route: "/" }
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
