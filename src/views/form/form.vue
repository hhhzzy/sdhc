<template>
    <div class="form-box">

    </div>
</template>
<script>
export default {
    props: {
        mineType: {
            type: String,
            default: 'ck'
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.mineType)
    }
}
</script>
<style lang="less" scoped>

</style>
