import Vue from 'vue'
import Router from 'vue-router'
// 解决点击重复路由router报promise的错误问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
/**
 *  配置项
 *  hidden: true // 是否在菜单栏显示,true：隐藏 false: 显示
 *  meta: {
 *      roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
 *      title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
 *      alwaysShow: false // 一个路由下面有多个子路由的时候自动变成嵌套模式。小于一个或者没有的时候只显示跟路由。设置为true的话就会，一个子路由也会显示成嵌套路由
 *  }
 *  name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 *  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *
 *
 */
Vue.use(Router)
/**
 *默认路由，不需要权限
 */
export const constRouter = [
    {
        path: '/login',
        hidden: true,
        name: 'login',
        component: () => import('@/views/login/login')
    },
    {
        path: '/',
        meta: {
            title: '首页',
            icon: 'md-home'
        },
        component: () => import('@/layout/index'),
        redirect: '/home',
        name: 'Home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/home'),
                name: 'Home',
                meta: {
                    title: '首页',
                    icon: 'md-home',
                    affix: true,
                    breadcrumb: false
                }
            }
        ]
    }
    // {
    //     path: '/level',
    //     component: () => import('@/layout/index'),
    //     meta: {
    //         title: 'level',
    //         icon: 'logo-buffer',
    //         breadcrumb: false
    //     },
    //     name: 'level',
    //     children: [
    //         {
    //             path: 'level_1',
    //             meta: {
    //                 title: 'level_1'
    //             },
    //             name: 'level_1',
    //             component: () => import('@/views/level/level_1/level_1')
    //         },
    //         {
    //             path: 'level_2',
    //             meta: {
    //                 title: 'level_2',
    //                 alwaysShow: true
    //             },
    //             name: 'level_2',
    //             component: () => import('@/views/level/level_2/level_2'),
    //             children: [
    //                 {
    //                     path: 'level_2_1',
    //                     meta: {
    //                         title: 'level_2_1'
    //                     },
    //                     name: 'level_2_1',
    //                     component: () => import('@/views/level/level_2/child/level_2_1')
    //                 },
    //                 {
    //                     path: 'level_2_2',
    //                     meta: {
    //                         title: 'level_2_2'
    //                     },
    //                     name: 'level_2_2',
    //                     component: () => import('@/views/level/level_2/child/level_2_1')
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'level_3',
    //             meta: {
    //                 title: 'level_3'
    //             },
    //             name: 'level_3',
    //             component: () => import('@/views/level/level_3/level_3')
    //         }

    //     ]
    // }
]
/**
 *动态路由，需要权限，动态创建
 */
export const asyncRouter = [
    {
        path: '/sys',
        component: () => import('@/layout/index'),
        meta: {
            roles: ['editor'],
            title: '设置',
            icon: 'md-settings'
        },
        name: 'sys',
        children: [
            {
                path: 'user',
                component: () => import('@/views/sys/user'),
                meta: {
                    roles: ['admin'],
                    title: '用户'
                },
                name: 'user'
            },
            {
                path: 'setting',
                component: () => import('@/views/sys/setting'),
                meta: {
                    roles: ['editor'],
                    title: '编辑角色'
                },
                name: 'setting'
            },
            {
                path: 'role',
                component: () => import('@/views/sys/role'),
                meta: {
                    roles: ['admin'],
                    title: 'admin角色'
                },
                name: 'role'
            }
        ]
    },
    {
        path: '/list',
        component: () => import('@/layout/index'),
        meta: {
            roles: ['admin', 'editor'],
            title: '数据列表',
            icon: 'ios-folder',
            breadcrumb: false
        },
        name: 'list',
        children: [
            {
                path: 'list_info',
                meta: {
                    title: '列表',
                    roles: ['editor']
                },
                name: 'list_info',
                component: () => import('@/views/list/list')
            },
            {
                path: 'add_form',
                meta: {
                    title: '表单',
                    roles: ['editor']
                },
                hidden: true,
                name: 'add_form',
                component: () => import('@/views/form/form')
            }

        ]
    }
]
/**
 *创建路由
 */
const createRouter = () => new Router({
    mode: 'history',
    routes: constRouter
})
const router = createRouter()

export default router
