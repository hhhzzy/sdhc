<template>
    <div class="user-box">
        <h1>编辑角色</h1>
    </div>
</template>
<script>
export default {
    name: 'User',
    mounted() {
        console.log(this.$route.query)
    }
}
</script>
