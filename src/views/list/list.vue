<template>
    <div class="list-box">
        <div class="btn-box">

        </div>
        <Tabs type="card" :animated="false" @on-click="ClkTab">
            <TabPane name="tk" label="探矿权人公示信息核查">标签一的内容</TabPane>
            <TabPane name="ck" label="采矿权人公示信息核查">标签二的内容</TabPane>
            <TabPane name="ks" label="矿山年底实地核查">标签三的内容</TabPane>
        </Tabs>
        <Form type="mineType" />
    </div>
</template>
<script>
import Form from '../form/form'
export default {
    components: {
        Form
    },
    data() {
        return {
            mineType: 'tk'
        }
    },
    methods: {
        ClkTab(name) {
            console.log(name)
            this.mineType = name
        }
    }
}
</script>
<style scoped>
</style>

