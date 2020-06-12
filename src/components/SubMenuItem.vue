<template>
  <transition name="slide">
    <div v-if="menuItem.open_menu">
      <ul>
        <li v-for="sub_menu_item in menuItem.sub_menus" :key="sub_menu_item.name">
          <router-link :to="sub_menu_item.route" @click.native="$emit('toggle-side-bar')">
            <div class="menu-item">{{ sub_menu_item.name }}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    menuItem: Object
  }
};
</script>

<style lang="scss">
.slide-enter-active {
  animation: slide-in-out 0.6s;
}

.slide-leave-active {
  animation: slide-in-out 0.8s ease-in-out reverse;
}

@keyframes slide-in-out {
  0% {
    transform: translateX(-25%);
    opacity: 0;
  }
  80% {
    transform: translateX(0%);
    opacity: 0.35;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
</style>
