<template>
  <ul class="menu-list">
      <li v-for="menuItem in menuItems" :key="menuItem.name">
        <router-link :to="menuItem.route" @click.native="openSubMenu(menuItem)">
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
        <template v-if="menuItem.hasOwnProperty('sub_menus')">
          <sub-menu-item
            :menu-item = menuItem
            @toggle-side-bar="$emit('toggle-side-bar')"
          />
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
          if (menuItem.name !== item.name){
            menuItem.open_menu = false
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
