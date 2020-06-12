<template>
  <ul>
    <li v-for="menuItem in menuItems" :key="menuItem.name">
      <router-link :to="menuItem.route" @click.native="openSubMenu(menuItem)">
        <div class="menu-header">
          <div class="is-clearfix">
            <div class="is-pulled-left" style="width: 14%">
              <span class="icon">
                <i :class="menuItem.icon" size="lg"></i>
              </span>
            </div>
            <div class="is-pulled-left" style="width: 86%">{{ menuItem.name }}</div>
          </div>
        </div>
      </router-link>
      <template v-if="menuItem.hasOwnProperty('sub_menus')">
        <div class="menu-body">
          <sub-menu-item :menu-item="menuItem" @toggle-side-bar="$emit('toggle-side-bar')" />
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
import SubMenuItem from "@/components/SubMenuItem.vue";

export default {
  name: "MenuItem",
  props: {
    menuItems: Array
  },
  methods: {
    openSubMenu(item) {
      // Close others
      if (!item.sub_menus) {
        this.$emit("toggle-side-bar");
      } else {
        this.menuItems.forEach(menuItem => {
          if (menuItem.name !== item.name) {
            menuItem.open_menu = false;
          }
        });
        // Open sub menu
        item.open_menu = !item.open_menu;
      }
    }
  },
  components: {
    SubMenuItem
  }
};
</script>

<style lang="scss">
.menu-header {
  padding: 12px;
  width: 100%;
}

.menu-header:hover {
  background-color: orange;
}

.menu-body {
  background-color: #eeeeee;
}

.menu-item {
  padding: 5px 0px 5px 16px;
}

.menu-item:hover {
  background-color: orange;
}
</style>
