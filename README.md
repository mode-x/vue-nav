# Vue Navs

Vue Nav is a composite navigation component for Vue apps. The intention of the component is to make it easy to integrate **Side-Navs** and **Nav-bars** in a Vue project. Currently, the component is designed to work with [Bulma CSS framework](https://bulma.io/) and uses [Hamburgers](https://jonsuh.com/hamburgers/). Besides, in subsequent versions it will be made to work also with either:

- Bootstrap
- Materialize

# Installation

```
npm install vue-navs
or
yarn add vue-navs
```

# Dependency

```
Bulma is needed to use this component. Visit [https://bulma.io/] to learn more.
Run npm install bulma
or
yarn add bulma
```

# Integration

1. After installation
2. import the component into main.js

```
import VueNavs from "vue-navs"

Vue.component("vue-navs", VueNavs)
```

3. Create a file named bulma.scss in assets folder and add the follwing:

```
@import "./../../node_modules/vue-navs/dist/VueNavs.css";
@import "./../../node_modules/bulma/css/bulma.css";
```

4. The component is ready to be used in your Vue app
5. In the parent component, your declaration should look like this:

```
<vue-navs
  :logged-in="logged_in"
  :site="site"
  :user="user"
  v-on:log-out="logOut"
  :menu-items="menu_items"
/>
```

### Prop default composition

- logged_in is a Boolean value
- site is an Object
- user is an Object
- logOut is a function

```
<script>
  export default {
    name: "Your Parent",
    data() {
      return {
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

# Licence

Copyright 2019 Pidasys

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
