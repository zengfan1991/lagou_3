module.exports = {
    router: {
        extendRoutes(routes, resolve) {
            // routes = []  这个方法清除不对
            routes.splice(0)  // 清除原有的数组
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layouts'),
                children: [
                    {
                        path: '',
                        name: 'home',
                        component: resolve(__dirname, 'pages/home'),
                    },
                    {
                        path: 'login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login'),
                    },
                    {
                        path: 'register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login'),
                    },
                    {
                        path: 'profile/:username',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile'),
                    },
                    {
                        path: 'Article',
                        name: 'Article',
                        component: resolve(__dirname, 'pages/Article'),
                    },
                    {
                        path: 'articleDetail/:slug',
                        name: 'articleDetail',
                        component: resolve(__dirname, 'pages/Article/detail.vue'),
                    },
                    {
                        path: 'settings',
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings'),
                    },
                ]
            }])
        },
        linkExactActiveClass: 'active',
    },
    plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
    server: {
        host: '0.0.0.0',// 监听所有外网地址。在生产环境服务器上外网环境就能访问到了，在本地的话，局域网都能访问到了
        port: 3000
    },
}