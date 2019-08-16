# Vue Navs

Vue Nav is a composite navigation component for Vue apps. The intention of the component is to make it easy to integrate **Side-Navs** and **Nav-bars** in a Vue project. Currently, the component is designed to work with [Bulma CSS framework](https://bulma.io/) and uses [Hamburgers](https://jonsuh.com/hamburgers/) for menu button. Besides, in subsequent versions it will be made to work also with either:

- Bootstrap
- Materialize

# Installation

```
npm install vue-navs
or
yarn add vue-navs
```

# Dependency

The following are required:

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
2. Add the following in main.js

```
import VueNavs from "vue-navs"

import "@/assets/css/bulma.scss";

Vue.component("vue-navs", VueNavs)
```

3. Create a file _assets/css/bulma.scss_ and add these import statements to it:

```
@import "./../../../node_modules/vue-navs/dist/VueNavs.css";
@import "./../../../node_modules/bulma/css/bulma.css";
@import "./../../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";
```

4. The component is ready to be used in your Vue app within your parent component.
5. In the parent component, your declaration should look like this:

```
<vue-navs
  :hamburger-type="hamburger_type"
  :logged-in="logged_in"
  :site="site"
  :user="user"
  :menu-items="menu_items"
  v-on:log-out="logOut"
/>
```

### Props - default composition

- hamburger-type is a String (hamburger--spin is the default style. Visit https://jonsuh.com/hamburgers/ for more styles).
- logged-in is a Boolean value.
- site is an Object.
- user is an Object.
- menu-items is an Object.
- logOut is a function.

Below is the default composition of the props property of the component:

```
<script>
  export default {
    name: "Your Parent",
    data() {
      return {
        hamburger_type: "hamburger--spin",
        logged_in: true,
        site: { name: "My Website Name" },
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
            icon_name: "tv"
          },
          {
            header_title: "Billing",
            header_route: "/billing",
            icon_type: "fas",
            icon_name: "dollar-sign"
          },
          {
            header_title: "Users",
            header_route: "/",
            icon_type: "fas",
            icon_name: "users",
            sub_menus: [
              { name: "Users", route: "/users" },
              { name: "Administrators", route: "/admin" }
            ]
          },
          {
            header_title: "Preferences",
            header_route: "/",
            icon_type: "fas",
            icon_name: "cog",
            sub_menus: [{ name: "Settings", route: "/settings" }]
          }
        ]
      }
    },
    methods: {
      logOut() {
        this.logged_in = !this.logged_in
      }
    }
  }
</script>
```

# Features

1. Provides log in and log out templates.
2. Built-in capability for flexible use of either Bulma (default), Bootstrap or Materialize css libraries (WIP).
3. Easy customization of hamburger button style and more.

# Licence

Copyright 2019 Pidasys

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
