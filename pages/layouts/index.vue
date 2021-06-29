<template>
  <div>
    <!-- 头部导航 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!--exact  : 精确匹配  -->
        <router-link to="/" class="nav-link" exact>conduit</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <router-link to="/article" class="nav-link">
                <i class="ion-compose"></i>&nbsp;New Post</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/settings" class="nav-link">
                <i class="ion-gear-a"></i>&nbsp;Settings</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link ng-binding">
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                Sign up</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link"> Sign in</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- 子路由 -->
    <nuxt-child />
    <!-- 底部组件 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layoutDefault",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>