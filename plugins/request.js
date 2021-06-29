//基于axios  创建实例
import axios from "axios";
export const network = axios.create({
    baseURL: 'https://conduit.productionready.io'
})
//请求拦截器

export default ({ store }) => { 
    network.interceptors.request.use(config => {
        let { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }) 
}
//响应拦截器 