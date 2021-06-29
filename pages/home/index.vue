<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                      tag,
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'global_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                      tag,
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                >
                  # {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="item in articles"
            :key="item.slug"
          >
            <div class="article-meta">
              <router-link
                :to="{
                  name: 'profile',
                  params: {
                    username: item.author.username,
                  },
                }"
                ><img :src="item.author.image"
              /></router-link>
              <div class="info">
                <router-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: item.author.username,
                    },
                  }"
                  class="author"
                  >{{ item.author.username }}</router-link
                >
                <span class="date">{{
                  item.updatedAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="item.favoriteDisabled"
                :class="{
                  active: item.favorited,
                }"
                @click="onFavorite(item)"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <router-link
              :to="{
                name: 'articleDetail',
                params: {
                  slug: item.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </router-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item ng-scope"
                :class="i === pageNum ? 'active' : ''"
                v-for="i in page"
                :key="i"
              >
                <router-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      pageNum: i,
                      tag,
                      tab,
                    },
                  }"
                  >{{ i }}</router-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag,
                  },
                }"
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticle,
  getTags,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "home",
  watchQuery: ["pageNum", "tag", "tab"],
  // 做 seo  首页渲染
  async asyncData(context) {
    let pageSize = 10;
    let pageNum = context.query.pageNum || 1;
    let tag = context.query.tag ? decodeURIComponent(context.query.tag) : "";
    let tab = context.query.tab
      ? decodeURIComponent(context.query.tab)
      : "global_feed";
    let loadArticle = tab === "your_feed" ? getYourFeedArticles : getArticle;
    const [articleData, tageData] = await Promise.all([
      loadArticle({
        pageSize,
        pageNum,
        tag,
        tab,
      }),
      getTags(),
    ]);
    let { articles, articlesCount } = articleData.data;
    articles.forEach((v) => (v.favoriteDisabled = false));
    const tags = tageData.data.tags.filter((tag) => {
      if (encodeURIComponent(tag).includes("%E2%80%8C")) {
        return false;
      }
      return true;
    });

    return {
      articles,
      articlesCount,
      pageSize,
      pageNum,
      tags,
      tag,
      tab,
    };
  },
  computed: {
    ...mapState(["user"]),
    page() {
      return Math.ceil(this.articlesCount / this.pageSize);
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>