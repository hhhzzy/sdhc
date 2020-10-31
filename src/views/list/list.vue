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
                    <i-col span="6">
                        <Button style="margin-right:5px;margin-left:5px;" type="primary">查询</Button>
                        <Button type="primary" @click="GotoAddMine">添加核查项目</Button>
                    </i-col>
                </Row>
            </Form>
        </div>
        <Tabs type="card" :animated="false" @on-click="ClkTab">
            <TabPane name="tk" label="探矿权人公示信息核查" />
            <TabPane name="ck" label="采矿权人公示信息核查" />
            <TabPane name="ks" label="矿山年底实地核查" />
        </Tabs>
        <Table border :columns="columns1" :data="listArr" />
        <!--     选择核查类型      -->
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
        <!--     添加核查项目      -->
        <Modal
            v-model="projectModel"
            title="核查项目添加"
            footer-hide
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="核查年度" prop="checkionTime">
                    <DatePicker v-model="formValidate.checkionTime" style="width:100%;" type="year" placeholder="请选择核查年度" />
                </FormItem>
                <FormItem label="所在行政区" prop="regionId">
                    <Select v-model="formValidate.regionId" placeholder="请选择所在行政区">
                        <Option v-for="(item,index) in regionArr" :key="index" :value="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="许可证号" prop="licenseKey">
                    <Input v-model="formValidate.licenseKey" placeholder="请输入许可证号" /></Input>
                </FormItem>
                <FormItem label="矿权名称" prop="mineName">
                    <Input v-model="formValidate.mineName" placeholder="请输入矿权名称" /></Input>
                </FormItem>
                <FormItem label="核查类型" prop="checkType">
                    <Select v-if="dicArr[12] && dicArr[12].children" v-model="formValidate.checkType" placeholder="请选择核查类型">
                        <Option v-for="(item,index) in dicArr[12].children" :key="index" :value="item.itemValue">{{ item.itemName }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button style="margin-left: 8px" @click="handleReset('formValidate')">重置</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { GetAllRegion, CreateProject, Dictionary, GetMyProjects } from '@/api/list'
export default {
    components: {
    },
    filters: {

    },
    data() {
        return {
            mineType: 'tk',
            SearchData: {
                keyword: '',
                dataStatus: null
            },
            projectModel: false,
            addTypeModel: false,
            columns1: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '核查年度',
                    key: 'checkionTime',
                    render: (h, params) => {
                        return h('div', [
                            h('p', this.$moment(params.row.checkionTime).format('YYYY'))
                        ])
                    }
                },
                {
                    title: '矿山名称',
                    key: 'mineName',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    coloe: '#096dd9'
                                },
                                on: {
                                    click: () => {
                                        //
                                    }
                                }
                            }, params.row.mineName)
                        ])
                    }
                },
                {
                    title: '矿山类型',
                    key: 'checkTypeDesc'
                },
                {
                    title: '所在行政区',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.region.regionName)
                        ])
                    }
                },
                {
                    title: '核查级别',
                    key: 'checkLevelDesc'
                },
                {
                    title: '核查单位',
                    key: 'checkUnitDesc'
                },
                {
                    title: '数据填报状态',
                    key: 'dataStatusDesc'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        this.$router.push({
                                            path: '/list/add_form',
                                            query: {
                                                type: params.row.checkType, // 这是传的参数
                                                id: params.row.id,
                                                boolEdit: true
                                            }
                                        })
                                    }
                                }
                            }, '数据填报'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '提交'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            listArr: [
            ],
            formValidate: {
                checkionTime: '',
                regionId: '',
                licenseKey: '',
                mineName: '',
                checkType: []
            },
            ruleValidate: {
                checkionTime: [
                    { required: true, type: 'date', message: '请选择核查年度', trigger: 'change' }
                ],
                regionId: [
                    { required: true, message: '请选择所在行政区', trigger: 'change' }
                ],
                licenseKey: [
                    { required: true, message: '请输入许可证号', trigger: 'blur' }
                ],
                mineName: [
                    { required: true, message: '请输入矿权名称', trigger: 'blur' }
                ],
                checkType: [
                    { required: true, type: 'number', message: '请选择核查类型', trigger: 'change' }
                ]
            },
            regionArr: [],
            dicArr: []
        }
    },
    mounted() {
        this.GetAllRegion()
        this.Dictionary()
        this.GetMyProjects()
    },
    methods: {
        ClkTab(name) {
            console.log(name)
            this.mineType = name
            if (name === 'tk') {
                this.SearchData.checkType = 1
            } else if (name === 'ck') {
                this.SearchData.checkType = 2
            } else {
                this.SearchData.checkType = 3
            }
            this.GetMyProjects()
        },
        // 新增矿山
        GotoAddMine() {
            this.projectModel = true
        },
        // 进入矿山登记表
        MineTypeSet(type) {
            console.log(type)
        },
        // 提交核查登记
        handleSubmit(name) {
            const formData = Object.assign({}, this.formValidate)
            formData.checkionTime = this.$moment(formData.checkionTime).format('YYYY-MM-DD')
            console.log(formData)
            this.$refs[name].validate((valid) => {
                if (valid) {
                    CreateProject(formData).then(res => {
                        console.log(res)
                        if (res) {
                            this.$Message.success('核查项目提交成功!')
                            this.projectModel = false
                            this.GetMyProjects()
                        }
                    })
                }
            })
        },
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields()
        },
        // 获取所有区县
        GetAllRegion() {
            GetAllRegion().then(res => {
                this.regionArr = res || []
            })
        },
        // 获取数据字典
        Dictionary() {
            Dictionary().then(res => {
                console.log(res)
                this.dicArr = res || []
            })
        },
        // 获取列表
        GetMyProjects() {
            console.log(this.SearchData)
            GetMyProjects(this.SearchData).then(res => {
                console.log(res)
                this.listArr = res || []
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

