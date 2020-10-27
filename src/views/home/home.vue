<template>
    <div class="user-box">
        <h1 style="float:right;height:3000px;">这是首页</h1>
        <button @click="GotoDetail">进入详情页面</button>
        <ul>
            <li style="width:100px;height:50px;background:red;" @contextmenu.prevent.native="contextMenu('111')">11111</li>
            <li @contextmenu.prevent="contextMenu('222')">22222</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Home',
    mounted() {
    },
    methods: {
        GotoDetail() {
            this.$router.push({
                path: '/sys/setting',
                query: {
                    id: 1
                }
            })
        },
        contextMenu(data) {
            console.log(data)
        }
    }
}
</script>
