# Vue Navs

Vue Navs is a composite navigation component for Vue apps. The component makes it easy to integrate **Side-Nav** and **Nav-Bar** into a Vue project. Currently, the component is designed to work with [Bulma CSS framework](https://bulma.io/) and uses [Hamburgers](https://jonsuh.com/hamburgers/) for menu button styles.

# Installation

```
npm install vue-navs
or
yarn add vue-navs
```

# Dependencies

- Bulma
- Hamburgers
- Vue Router

```
Run npm install bulma hamburgers vue-router
or
yarn add bulma hamburgers vue-router
```

# Integration

1. After installation
2. Add the following to main.js

```
import VueNavs from "vue-navs"

import "@/assets/css/bulma.scss";

Vue.component("vue-navs", VueNavs)
```

3. Create a file _assets/css/bulma.scss_ and add these statements to it:

```
$hamburger-layer-width: 30px;
@import "~vue-navs/dist/VueNavs.css";
@import "~bulma/css/bulma.css";
@import "~hamburgers/_sass/hamburgers/hamburgers.scss";
```

4. In the parent component, your declaration should look like this:

```
<vue-navs
  :lib="lib"
  :hamburger-type="hamburger_type"
  :site="site"
  :user="user"
  :side-bar-type="side_bar_type"
  :side-bar-items="side_bar_items"
  :nav-bar-items="nav_bar_items"
  @log-out="logOut"
/>
```

5. Finally,

```
Add this to your index.html

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.1/css/all.css" />

The component currently, supports only fontawesome icons. Other icon libraries will be added soon.
```

### Props - default composition

- lib is a String indicating the base css library. The default is "bulma".
- hamburger-type is a String (hamburger--spin is the default style. Visit https://jonsuh.com/hamburgers/ for more styles).
- logged-in is a Boolean.
- site is an Object.
- user is an Object.
- side-bar-type is String specifying the type. It is either "above" or "below".
- side-bar-items is an Array.
- nav-bar-items is an Object.
- logOut is a Function.

Below is the default composition of the props property of the component:

```
<script>
  export default {
    name: "app",
    data() {
      return {
        hamburger_type: "hamburger--spin",
        logged_in: true,
        site: { name: "VUE NAVS" },
        user: {
          email: "mode-x@github.com",
          role: "admin",
          avatar: "https://bulma.io/images/placeholders/128x128.png"
        },
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
        nav_bar_items: [
          { name: "Profile", icon: "fas fa-user", route: "/profile" },
          { name: "Setting", icon: "fas fa-cog", route: "/setting" }
        ]
      };
    },
    methods: {
      logOut() {
        You could define custom actions here.
        For instance you can redirect to a login page:
        this.$router.replace("/login")
      }
    }
  }
</script>
```

# Licence

Copyright 2019 Pidasys

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
