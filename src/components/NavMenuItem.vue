<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <router-link
        :to="route"
        class="nav-menu-item"
        @click.native="performAction(action)"
      >
        <p class="icon" v-if="icon !== ''">
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
    icon: {
      type: String,
      default: ""
    },
    route: String,
    action: Function
  },
  methods: {
    performAction(action) {
      if (typeof action === "function") action();
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-menu-item {
  padding: 8px;
}
</style>
