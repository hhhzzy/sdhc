<template>
    <div class="user-box">
        <div class="btn-box">
            <Form :label-width="80">
                <Row>
                    <i-col span="6">
                        <FormItem label="用户名">
                            <Input v-model="SearchData.user" type="text" placeholder="请输入用户名" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="用户单位">
                            <Select v-model="SearchData.aa" placeholder="请选择用户单位">
                                <!-- <Option v-for="item in cityList" :key="item.value" :value="item.value">{{ item.label }}</Option> -->
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <Button style="margin-right:5px;margin-left:5px;" type="primary">查询</Button>
                        <Button type="primary" @click="addUser">添加用户</Button>
                    </i-col>
                </Row>
            </Form>
        </div>
        <Table border :columns="columns1" :data="UserList" />
        <Modal
            v-model="userModel"
            title="添加用户"
            footer-hide
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Tabs>
                    <TabPane label="用户">
                        <FormItem label="用户名" prop="name">
                            <Input v-model="formValidate.name" placeholder="请输入用户名" /></Input>
                        </FormItem>
                        <FormItem label="别名">
                            <Input v-model="formValidate.aliasName" placeholder="请输入别名" /></Input>
                        </FormItem>
                        <FormItem label="单位" prop="organizationId">
                            <Select v-model="formValidate.organizationId" placeholder="请选择单位">
                                <Option v-for="(item,index) in organizationArr" :key="index" :value="item.id">{{ item.organizationName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="邮箱">
                            <Input v-model="formValidate.email" placeholder="请输入邮箱" /></Input>
                        </FormItem>
                        <FormItem label="用户密码" prop="password">
                            <Input v-model="formValidate.password" type="password" placeholder="请输入用户密码" /></Input>
                        </FormItem>
                        <FormItem label="再次输入密码">
                            <Input v-model="formValidate.rePassword" type="password" placeholder="请再次输入密码" /></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane label="角色">
                        <CheckboxGroup v-model="roleUser">
                            <Checkbox v-for="(item,index) in rolesArr" :key="index" :label="item.name">{{ item.aliasName }}</Checkbox>
                        </CheckboxGroup>
                    </TabPane>
                </Tabs>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button style="margin-left: 8px" @click="handleReset('formValidate')">重置</Button>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>
<script>
import { GetUser, GetOrganization, AddUser, GetRples } from '@/api/user'
export default {
    name: 'User',
    data() {
        return {
            SearchData: {},
            organizationArr: [],
            rolesArr: [],
            roleUser: [],
            formValidate: {
                name: '',
                password: '',
                organizationId: '',
                email: '',
                aliasName: '',
                rePassword: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
                organizationId: [
                    { required: true, message: '请选择单位', trigger: 'change' }
                ]
            },
            UserList: [],
            userModel: false,
            columns1: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '别名',
                    key: 'aliasName'
                },
                {
                    title: '单位',
                    key: 'organization',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.organization ? params.row.organization.organizationName : '')
                        ])
                    }
                },
                {
                    title: '用户角色',
                    key: 'address',
                    render: (h, params) => {
                        const tagArr = []
                        if (params.row.roleInfos) {
                            params.row.roleInfos.forEach(item => {
                                tagArr.push(h('Tag', {
                                    props: {
                                        color: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, item.displayName))
                            })
                        }
                        return h('div', [
                            tagArr
                        ])
                    }
                },
                {
                    title: '最近登陆日期',
                    key: 'lastLoginTime',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.lastLoginTime ? this.$moment(params.row.lastLoginTime).format('YYYY-MM-DD') : '')
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'address'
                }
            ]
        }
    },
    mounted() {
        this.GetUser()
        this.GetOrganization()
        this.GetRples()
    },
    methods: {
        GotoAddMine() {

        },
        // 获取所有用户
        GetUser() {
            GetUser().then(res => {
                console.log(res)
                this.UserList = res || []
            })
        },
        // 获取单位
        GetOrganization() {
            GetOrganization().then(res => {
                console.log(res)
                this.organizationArr = res || []
            })
        },
        // 获取角色
        GetRples() {
            GetRples().then(res => {
                console.log(res)
                this.rolesArr = res || []
            })
        },
        // 新增用户
        addUser() {
            this.userModel = true
        },
        // 提交核查登记
        handleSubmit(name) {
            const formData = Object.assign({}, this.formValidate)
            console.log(formData)
            this.$refs[name].validate((valid) => {
                if (valid) {
                    AddUser(formData).then(res => {
                        console.log(res)
                        if (res) {
                            this.$Message.success('用户新增成功!')
                            this.userModel = false
                            this.GetUser()
                            this.formValidate = {
                                name: '',
                                password: '',
                                organizationId: '',
                                email: '',
                                aliasName: '',
                                rePassword: ''
                            }
                        }
                    })
                }
            })
        },
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields()
        }
    }

}
</script>
