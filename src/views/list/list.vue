<template>
    <div class="list-box">
        <div class="btn-box">
            <Form :label-width="80">
                <Row>
                    <i-col span="6">
                        <FormItem label="矿山名称">
                            <Input v-model="SearchData.user" type="text" placeholder="请输入矿山名称" />
                        </FormItem>
                    </i-col>
                    <i-col span="2">
                        <Button style="margin-right:5px;" type="primary">查询</Button>
                        <Button type="primary" @click="GotoAddMine">新增</Button>
                    </i-col>
                </Row>
            </Form>
        </div>
        <Tabs type="card" :animated="false" @on-click="ClkTab">
            <TabPane name="tk" label="探矿权人公示信息核查" />
            <TabPane name="ck" label="采矿权人公示信息核查">标签二的内容</TabPane>
            <TabPane name="ks" label="矿山年底实地核查">标签三的内容</TabPane>
        </Tabs>
        <Table border :columns="columns1" :data="data1" />
        <Modal
            v-model="addTypeModel"
            title="请选择核查类型"
            footer-hide
        >
            <div class="mine-add-box">
                <Row type="flex" align="middle">
                    <i-col span="18">
                        <p class="title">探矿权人公示信息核查</p>
                        <p>登记探矿权人公示信息核查表。</p>
                    </i-col>
                    <i-col span="4" offset="2">
                        <Button long type="primary" @click="MineTypeSet('tk')">登记</Button>
                    </i-col>
                </Row>
                <Row type="flex" align="middle">
                    <i-col span="18">
                        <p class="title">采矿权人公示信息核查</p>
                        <p>登记采矿权人公示信息核查表。</p>
                    </i-col>
                    <i-col span="4" offset="2">
                        <Button long type="primary" @click="MineTypeSet('ck')">登记</Button>
                    </i-col>
                </Row>
                <Row type="flex" align="middle">
                    <i-col span="18">
                        <p class="title">矿山年底实地核查</p>
                        <p>登记矿山年底实地核查表。</p>
                    </i-col>
                    <i-col span="4" offset="2">
                        <Button long type="primary" @click="MineTypeSet('ks')">登记</Button>
                    </i-col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            mineType: 'tk',
            SearchData: {

            },
            addTypeModel: false,
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
        }
    },
    methods: {
        ClkTab(name) {
            console.log(name)
            this.mineType = name
        },
        // 新增矿山
        GotoAddMine() {
            this.addTypeModel = true
        },
        // 进入矿山登记表
        MineTypeSet(type) {
            console.log(type)
            this.$router.push({
                path: '/list/add_form',
                query: {
                    type: type // 这是传的参数
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
 .mine-add-box{
    .ivu-modal-body{
        padding: 0 45px;
    }
    .ivu-row-flex{
        padding: 16px 0;
        border-bottom: 1px solid #e9eaec;
    }
    p.title{
        font-size: 16px;
        font-weight: bold;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>

