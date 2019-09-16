<template>
  <div>
    <ul class="menu-list">
      <li v-for="menuItem in menuItems" :key="menuItem.name">
        <router-link :to="menuItem.route" @click.native="openSubMenu">
          <div class="is-clearfix" style="width: 100%">
            <div class="is-pulled-left" style="width: 14%">
              <span class="icon">
                <i :class="menuItem.icon" size="lg"></i>
              </span>
            </div>
            <div class="is-pulled-left" style="width: 86%">
              {{ menuItem.name }}
            </div>
          </div>
        </router-link>
        <div
          :id="`${menuItem.name.toLowerCase().replace(/\W/gi, '-')}-items`"
          class="sub-menu"
          style="display:none"
          v-if="menuItem.hasOwnProperty('sub_menus')"
          data-open="false"
          :data-parent="`${menuItem.name.toLowerCase().replace(/\W/gi, '-')}`"
        >
          <ul>
            <li
              v-for="sub_menu_item in menuItem.sub_menus"
              :key="sub_menu_item.name"
            >
              <router-link
                :id="
                  `${sub_menu_item.name
                    .toLowerCase()
                    .replace(/\W/gi, '-')}-sub-menu-items`
                "
                :to="sub_menu_item.route"
                @click.native="$emit('toggle-menu')"
                >{{ sub_menu_item.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    menuItems: Array
  },
  methods: {
    openSubMenu(e) {
      // Clicked menu item name
      const name = e.target.innerText;
      // Check if the clicked menu has sub menus
      // If it does return it as menus
      const menus = this.menuItems.filter(
        menuItem => menuItem.sub_menus && menuItem.name === name
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
        const id = `${name.toLowerCase().replace(/\W/gi, "-")}-items`;
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
              name.toLowerCase().replace(/\W/gi, "-")
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
