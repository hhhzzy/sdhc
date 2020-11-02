<template>
    <div class="count-box">
        <Tabs :value="type" @on-click="ChangeTab">
            <TabPane label="矿种数量统计表" name="mineralNumber" />
            <TabPane label="采矿权公示信息实地核查结果统计表" name="ckTable" />
            <TabPane label="年底矿山实地核查结果统计表" name="ndTable" />
            <TabPane label="全市实地核查矿山总体情况表" name="name4" />
        </Tabs>
        <mineralNumber v-if="type == 'mineralNumber'" />
        <ckTable v-if="type == 'ckTable'" />
        <ndTable v-if="type == 'ndTable'" />
    </div>
</template>
<script>
import mineralNumber from './mineralNumber'
import ndTable from './ndTable'
import ckTable from './ckTable'
export default {
    components: {
        mineralNumber: mineralNumber,
        ckTable: ckTable,
        ndTable: ndTable
    },
    data() {
        return {
            type: 'mineralNumber'
        }
    },
    methods: {
        ChangeTab(name) {
            console.log(name)
            this.type = name
        }
    }
}
</script>
<style lang="less">
.count-box{
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
}
</style>
