<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <router-link
        :to="route"
        class="nav-menu-item"
        @click.native="performAction(action)"
      >
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
    route: String,
    action: Function,
    noIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    performAction(action) {
      if (typeof action === "function") {
        action();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-menu-item {
  padding: 8px;
}
</style>
