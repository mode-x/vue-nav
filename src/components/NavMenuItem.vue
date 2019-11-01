<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <router-link :to="route" class="nav-menu-item" @click.native="closeMenu">
        <p class="icon" v-if="!noIcon">
          <i :class="icon" size="lg"></i>
        </p>
        <p class="heading">{{ name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMenuItem",
  props: {
    name: String,
    icon: String,
    route: {
      type: String,
      default: "/"
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    loggedOut: Boolean
  },
  methods: {
    closeMenu() {
      if (this.loggedOut) {
        document.getElementsByClassName("navbar-burger")[0].click();
      }
    }
  }
};
</script>
