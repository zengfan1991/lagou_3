<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages" v-if="errorMsg">
            <template v-for="(err, field) in errorMsg">
              <li v-for="item in err" :key="item">{{ field }} {{ item }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 客户端
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "loginIndex",
  middleware:'noAuthenticated',
  computed: {
    isLogin() { 
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      username: "",
      email: "qaz@163.com",
      password: "12345678+",
      errorMsg: false,
    };
  },
  methods: {
    async onSubmit() {
      let { email, password, isLogin, username } = this;
      try {
        if (isLogin) {
          let params = {
            user: {
              email,
              password,
            },
          };
          let { data } = await login(params);
          if (data) {
            //保存身份验证
            this.$store.commit("setUser", data.user);
            // 添加cookie
            Cookie.set("user", data.user);
            this.$router.push("/");
          }
        } else {
          let params = {
            user: {
              email,
              password,
              username,
            },
          };
          let { data } = await register(params);
          if (data) {
            this.$router.push("/");
          }
        }
      } catch (error) {
        this.errorMsg = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>