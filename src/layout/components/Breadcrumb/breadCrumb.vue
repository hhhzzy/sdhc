<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="(item) in breadList" :key="item.path">
            <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
import * as pathToRegexp from 'path-to-regexp'
export default {
    data() {
        return {
            breadList: null
        }
    },
    watch: {
        $route(route) {
            // if you go to the redirect page, do not update the breadcrumbs
            if (route.path.startsWith('/redirect/')) {
                return
            }
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            // 筛选出有meta里面有title的路由
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
            console.log(this.$route, matched)
            const first = matched[0]
            if (!this.isHome(first)) { // 没有首页路由，加入首页路由
                matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
            }
            this.breadList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            console.log(this.breadList)
        },
        isHome(route) { // 当前路由中是否有首页路由
            const name = route && route.name
            console.log(name)
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
        },
        pathCompile(path) {
            // 解决面包屑导航路由地址加参数的问题
            const { params } = this.$route
            var toPath = pathToRegexp.compile(path)
            return toPath(params)
        },
        handleLink(item) {
            const { redirect, path } = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(this.pathCompile(path))
        }
    }
}
</script>
