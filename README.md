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
Bulma is needed to use this component. Visit <https://bulma.io/> to learn more.
Simply run npm install bulma or yarn add bulma
```

# Integration

1. After installing using npm or yarn
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

# Licence

Copyright 2019 Pidasys

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
