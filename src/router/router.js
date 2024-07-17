import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    // 根据环境变量的配置，开发时使用 history模式，打包时使用 hash 模式
    history: (import.meta.env.VITE_ENV == 'DEVELOPMENT') ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
    routes: [

]
})

// 导出路由对象
export default router
