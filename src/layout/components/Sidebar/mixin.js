export default {
    methods: {
        // 点击左边菜单跳转到当前页面
        handleSelect(route) {
            let { name, params, query } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }
            this.$router.push({
                name,
                params,
                query
            })
        },
        // 获取路由的name
        getName(item) {
            return item.children ? item.children[0].name : item.name
        },
        // 判断当前路由有子路由并且（子路由的数量大于1或者有alwaysShow属性） alwaysShow：为true的话，一个子路由会变成嵌套路由
        showChildren(item) {
            return item.children && (item.children.length > 1 || (item.meta && item.meta.alwaysShow))
        }
    }
}
