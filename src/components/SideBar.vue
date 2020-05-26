<template>
  <transition name="side-bar">
    <div id="side-bar" v-if="showSideBar" v-bind:style="sideBarStyle">
      <aside style="max-width: 250px; min-width: 250px;">
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
            <p class="user-info has-background-grey-lighter">
              {{ user.email }} | {{ user.role }}
            </p>
            <hr />
          </slot>
        </section>
        <!-- Menu items-->
        <menu-item
          :menu-items="sideBarItems"
          @toggle-menu="$emit('toggle-side-bar')"
        />
        <!-- Logged In menu -->
        <section class="is-hidden-desktop">
          <hr />
          <ul class="menu-list">
            <li v-for="navBarItem in navBarItems" :key="navBarItem.name">
              <router-link :to="navBarItem.route">
                <div class="is-clearfix" style="width: 100%">
                  <div class="is-pulled-left" style="width: 14%">
                    <span class="icon">
                      <i :class="navBarItem.icon" size="lg"></i>
                    </span>
                  </div>
                  <div class="is-pulled-left" style="width: 86%">
                    {{ navBarItem.name }}
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
  </transition>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";

export default {
  name: "Sidebar",
  props: {
    user: Object,
    sideBarItems: Array,
    navBarItems: Array,
    showSideBar: Boolean,
    sideBarType: {
      type: String,
      default: "below"
    },
    sideBarStyle: {
      type: Object,
      default: () => {
        return {
          width: "0px",
          height: "100%",
          backgroundColor: "#000",
          position: "fixed",
          zIndex: 1000,
          overflowY: "auto",
          overflowX: "hidden",
          top: "0px",
          boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)`
        };
      }
    }
  },
  watch: {
    showSideBar(n, o) {
      if (n) {
        this.sideBarStyle.width = "250px";
      }
    }
  },
  methods: {
    setSideBarTopOffset() {
      if (this.sideBarType == "below") {
        const navBarHeight = document.getElementById("nav-bar").clientHeight;
        this.sideBarStyle.top = `${navBarHeight}px`;
      } else {
        this.sideBarStyle.top = "0px";
      }
    }
  },
  mounted() {
    this.setSideBarTopOffset();
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

aside{
  padding-bottom: 100px;
}

.side-bar-enter-active {
  animation: side-bar 0.5s;
}
.side-bar-leave-active {
  animation: side-bar 0.5s ease-in-out reverse;
}
@keyframes side-bar {
  from {
    width: 0px;
  }
  to {
    width: 250px;
  }
}

</style>
