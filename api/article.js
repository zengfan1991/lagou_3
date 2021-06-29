import { network } from '@/plugins/request.js'

export const getArticle = function (params = {}) {
    return network.get("/api/articles", {
        params: {
            limit: params.pageSize,
            offset: (params.pageNum - 1) * params.pageSize || '',
            tag: params.tag || '',

        }
    });
}

// 获取公共文章列表
export const getYourFeedArticles = params => {
    return network({
        method: 'GET',
        url: '/api/articles/feed',
        params,
    })
}

export const getTags = function () {
    return network.get("/api/tags");
}

// 添加点赞
export const addFavorite = slug => {
    return network({
      method: 'POST',
      url: `/api/articles/${slug}/favorite`
    })
  }
  
  // 取消点赞
  export const deleteFavorite = slug => {
    return network({
      method: 'DELETE',
      url: `/api/articles/${slug}/favorite`
    })
  }
  // 获取文章详情
export const getArticleDetail = slug => {
    return network({
      method: 'GET',
      url: `/api/articles/${slug}`
    })
  }
  
  // 获取文章评论
  export const getComments = slug => {
    return network({
      method: 'GET',
      url: `/api/articles/${slug}/comments`
    })
  }
  