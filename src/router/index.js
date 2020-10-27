import router from './router'
import store from '@/store/index'
import Router from 'vue-router'
import { getToken } from '@/libs/token'

router.beforeEach(async(to, from, next) => {
    // 判断是否登录（是否有token）
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next('/')
        } else {
            /**
             * 判断是否有用户数据
             * 1.没有：没有用户数据 => 第一次登录，需要获取用户数据
             * 2.有：已经登录成功 => 只需要跳转路由
             */
            const hasRole = store.state.user.roles && store.state.user.roles.length > 0
            if (hasRole) {
                next()
            } else {
                // 获取用户角色
                const { roles } = (await store.dispatch('user/getUserInfo', hasToken)).data
                // 根据角色权限动态获取路由
                await store.dispatch('permission/getAddRouters', roles)
                const accessRoutes = store.state.permission.routes
                /**
                 * 因为路由动态加载，每次在添加的时候没有删除原有的路由，所以每次在添加的时候要删除原有的路由
                 * 解决路由重复问题：vue-router.esm.js?8c4f:16 [vue-router] Duplicate named routes definition
                 */
                router.matcher = new Router().matcher

                router.addRoutes(accessRoutes)
                // hack方法 确保addRoutes已完成
                // 设置replace：true。确保导航不会留下历史记录
                next({ ...to, replace: true })
            }
        }
    } else {
        /**
         * 跳转到登录页面
         * 判断进入的页面是否为login，否则会造成死循环
         * 离开当前页面的时候带上当前页面的路由，以便登录成功后返回该页面
         */
        if (to.path !== '/login') {
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }
    }
    next()
})
export default router
