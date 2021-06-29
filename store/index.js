const cookieparser = process.server ? require('cookieparser') : undefined
// 必须 是一个函数 , 
// 为了防止数据冲突,  
const state = () => {
    return {
        user: '小明'
    }
}
const mutations = {
    setUser(state, user) {
        state.user = user
    }
}
const actions = {
    nuxtServerInit({ commit }, { req }) {
        // 这个特殊的actions  只会在服务端渲染运行
        let user = null
        // node js  代码  如果请求头里面有cookie     
        if (req.headers.cookie) {
            // 解析 cookie
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)  
            } catch (err) {
                // No valid cookie found
                user = null
            }
        }
        // 提交 mutation  修改状态
        commit('setUser', user)
    }
}

export default {
    state,
    mutations,
    actions
}