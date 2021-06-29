<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>  
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div> 
      <hr />

      <div class="article-actions">
           <ArticleMeta :article="article" /> 
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2"> 
          <ArticleComments :article="article"  />
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
// http://localhost:5555/articleDetail/markdown-ddof1g
import { getArticleDetail, getComments } from "@/api/article";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue"

import MarkdownIt from "markdown-it";
export default {
  name: "articleDetail",
  async asyncData({ params }) {
    let {
      data: { article },
    } = await getArticleDetail(params.slug);
    const md = new MarkdownIt();
    article.body = md.render(article.body);

    console.log(article);
    return {
      article: article,
    };
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
    head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }
};
</script>

<style>
</style>