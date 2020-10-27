import { asyncRouter, constRouter } from '@/router/router'

const state = {
    routes: [], // 整个路由
    addRoutes: [] // 动态筛选出的有权限的路由
}
const mutations = {
    'SET_ROUTERS': (state, data) => {
        state.addRoutes = data
        state.routes = constRouter.concat(data)
    }
}
/**
 * 判断该用户是否可以访问该路由，有权限返回true
 * @param {*} route 单个路由
 * @param {*} roles 用户的权限
 */
function getPermission(route, roles) {
    if (route && route.meta) {
        return roles.some(value => {
            console.log(route.meta.title)
            return route.meta.roles.includes(value)
        })
    } else {
        return true
    }
}
/**
 * 通过权限筛选出可以访问的路由
 * @param {*} routers 传过来的所有需要权限验证的路由
 * @param {*} roles  用户所具有的的权限
 */
export function filterRouter(routers, roles) {
    const res = []
    routers.forEach(item => {
        const tmp = { ...item }
        if (getPermission(tmp, roles)) {
            if (item.children) {
                tmp.children = filterRouter(item.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}
const actions = {
    /**
     * 动态生成路由
     */
    getAddRouters({ commit }, roles) {
        return new Promise((resolve, reject) => {
            let accessRouter = null
            if (roles.includes('admin')) { // 超级管理员
                accessRouter = asyncRouter || []
            } else { // 其他角色
                accessRouter = filterRouter(asyncRouter, roles)
            }
            commit('SET_ROUTERS', accessRouter)
            resolve(accessRouter)
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
