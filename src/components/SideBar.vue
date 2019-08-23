<template>
  <div id="sidebar" style="display:none">
    <!-- Menu -->
    <aside>
      <section class="side-bar-header">
        <slot name="avatar">
          <p class="menu-label">Menu</p>
          <div class="has-text-centered">
            <figure class="image is-64x64 is-inline-block">
              <img class="is-rounded" :src="user.avatar" />
            </figure>
          </div>
        </slot>
        <slot name="info">
          <hr />
          <p class="user-info has-background-grey-lighter">
            {{ user.email }} | {{ user.role }}
          </p>
          <hr />
        </slot>
      </section>
      <!-- Menu items-->
      <menu-item
        :menu-items="menuItems"
        v-on:toggle-menu="$emit('toggle-menu')"
      />
      <!-- Logged In menu -->
      <section class="is-hidden-desktop">
        <hr />
        <ul class="menu-list">
          <li v-for="loggedInItem in loggedInItems" :key="loggedInItem.name">
            <router-link :to="loggedInItem.route">
              <div class="is-clearfix" style="width: 100%">
                <div class="is-pulled-left" style="width: 14%">
                  <span class="icon">
                    <i :class="loggedInItem.icon" size="lg"></i>
                  </span>
                </div>
                <div class="is-pulled-left" style="width: 86%">
                  {{ loggedInItem.name }}
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="#" @click.native="$emit('log-out')">
              <div class="is-clearfix" style="width: 100%">
                <div class="is-pulled-left" style="width: 14%">
                  <span class="icon">
                    <i class="fas fa-sign-out-alt" size="lg"></i>
                  </span>
                </div>
                <div class="is-pulled-left" style="width: 86%">Log Out</div>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";

export default {
  name: "Sidebar",
  props: {
    user: Object,
    menuItems: Array,
    loggedInItems: Array
  },
  components: {
    MenuItem
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  font-size: 0.85em;
  padding: 5px;
  margin-bottom: 5px;
}

.side-bar-header {
  padding: 16px 16px 0px 16px;
}

#sidebar {
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  top: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  animation: animateleft 0.6s;
}
</style>
