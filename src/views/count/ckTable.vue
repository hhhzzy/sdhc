<template>
    <div class="table-box">
        <div class="btn-box">
            <Row>
                <i-col span="6">
                    <Button style="margin-right:5px;margin-left:5px;" type="primary" @click="ExportTable">导出</Button>
                </i-col>
            </Row>
        </div>
        <div ref="table-content" class="table-content">
            <Table ref="table" :columns="columns11" :data="dataTable" border :height="tableH" />
        </div>
    </div>
</template>
<script>
import { GetCkTable } from '@/api/count.js'
export default {
    data() {
        return {
            columns11: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '区县',
                    align: 'center',
                    key: 'countyName'
                },
                {
                    title: '公示矿山数量',
                    align: 'center',
                    key: 'publicityCount'
                },
                {
                    title: '核查矿山数量',
                    align: 'center',
                    key: 'auditCount'
                },
                {
                    title: '越界预警情况',
                    align: 'center',
                    children: [
                        {
                            title: '不纳入',
                            align: 'center',
                            key: 'crossTheBorderCount'
                        },
                        {
                            title: '红色',
                            align: 'center',
                            key: 'redCount'
                        },
                        {
                            title: '黄色',
                            align: 'center',
                            key: 'orangeCount'
                        },
                        {
                            title: '蓝色',
                            align: 'center',
                            key: 'blueCount'
                        }
                    ]
                },
                {
                    title: '越界采矿',
                    key: 'crossCount',
                    align: 'center'
                },
                {
                    title: '持过期采矿许可证采矿',
                    key: 'overdueCount',
                    align: 'center'
                },
                {
                    title: '欠缴采矿权占用费',
                    key: 'arrears',
                    align: 'center'
                },
                {
                    title: '欠缴出让收益',
                    key: 'total',
                    align: 'center'
                },
                {
                    title: '未按要求设置界桩',
                    key: 'passMuster_BoundaryCount',
                    align: 'center'
                },
                {
                    title: '未按要求设置采矿权标识牌',
                    key: 'passMuster_SignboardCount',
                    align: 'center'
                },
                {
                    title: '未按要求提交储量年报',
                    key: 'subReservesCount',
                    align: 'center'
                },
                {
                    title: '未严格按照开发利用方案开采',
                    key: 'accordingPlanCount',
                    align: 'center'
                },
                {
                    title: '未足额计提治理恢复基金和土地复垦费',
                    key: 'recoveryAndLand_MoneyCount',
                    align: 'center'
                },
                {
                    title: '未按照土地复垦方案开展工作',
                    key: 'land_CheckCount',
                    align: 'center'
                },
                {
                    title: '未按照环境治理恢复方案开展工作',
                    key: 'recovery_CheckCount',
                    align: 'center'
                },
                {
                    title: '受到行政处罚未整改到位',
                    key: 'gender',
                    align: 'center'
                },
                {
                    title: '建议列入异常名录',
                    key: 'suggestedEntryCount',
                    align: 'center'
                }
            ],
            dataTable: [],
            tableH: null
        }
    },
    mounted() {
        this.GetCkTable()
        this.tableH = document.documentElement.clientHeight - this.$refs['table-content'].getBoundingClientRect().top - 20
    },
    methods: {
        //
        GetCkTable() {
            GetCkTable().then(res => {
                console.log(res)
                this.dataTable = res.map((item, index) => {
                    item.index = index + 1
                    return item
                }) || []
            })
        },
        ExportTable() {
            this.$refs.table.exportCsv({
                filename: '采矿权公示信息实地核查结果统计表'
            })
        }

    }
}
</script>
<style lang="less" scoped>
.btn-box{
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>
