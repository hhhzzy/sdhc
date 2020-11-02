<template>
    <div class="user-box">
        <div class="btn-box">
            <Form :label-width="80">
                <Row>
                    <i-col span="6">
                        <FormItem label="用户名">
                            <Input v-model="SearchData.Name" type="text" placeholder="请输入用户名" />
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="用户单位">
                            <Select v-model="SearchData.OrganizationId" clearable placeholder="请选择单位">
                                <Option v-for="(item,index) in organizationArr" :key="index" :value="item.id">{{ item.organizationName }}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <Button style="margin-right:5px;margin-left:5px;" type="primary" @click="SearchUser">查询</Button>
                        <Button type="primary" @click="addUser('add')">添加用户</Button>
                    </i-col>
                </Row>
            </Form>
        </div>
        <Table border :columns="columns1" :data="UserList" />
        <Modal
            v-model="userModel"
            title="添加用户"
            :loading="userModelLoading"
            @on-ok="handleSubmit('formValidate')"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Tabs @on-click="ChangeTab">
                    <TabPane label="用户" name="user">
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
                        <FormItem v-if="subType == 'add'" label="用户密码" prop="password">
                            <Input v-model="formValidate.password" type="password" placeholder="请输入用户密码" /></Input>
                        </FormItem>
                        <FormItem v-if="subType == 'add'" label="再次输入密码">
                            <Input v-model="formValidate.rePassword" type="password" placeholder="请再次输入密码" /></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane v-if="subType != 'add'" label="角色" name="role">
                        <Checkbox v-for="(item,index) in rolesArr" :key="index" v-model="item.checked" :label="item.name">{{ item.aliasName }}</Checkbox>
                    </TabPane>
                </Tabs>
            </Form>

        </Modal>

    </div>
</template>
<script>
import { GetUser, GetOrganization, AddUser, GetRoles, GetUserInfo, EditUserInfo, SetUserRole, DelUser } from '@/api/user'
export default {
    name: 'User',
    data() {
        return {
            SearchData: {},
            organizationArr: [],
            rolesArr: [],
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
            userModelLoading: true,
            subType: '',
            tabType: 'user',
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
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.userModel = true
                                        this.subType = 'edit'
                                        console.log(params.row)
                                        this.GetRoles()
                                        GetUserInfo(params.row.name).then(res => {
                                            this.formValidate = res || {}
                                            this.formValidate.organizationId = res.organization ? res.organization.id : ''
                                            if (res.roleInfos) {
                                                res.roleInfos.forEach(item => {
                                                    this.rolesArr.map(ele => {
                                                        if (item.name === ele.name) {
                                                            ele.checked = true
                                                        }
                                                        return ele
                                                    })
                                                })
                                            }
                                        })
                                    }
                                }
                            }, '修改'),
                            // h('Button', {
                            //     props: {
                            //         type: 'primary'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             console.log(params.row.name)

                            //         }
                            //     }
                            // }, '重置密码'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '提示',
                                            content: '是否确认删除该用户？',
                                            cancelText: '取消',
                                            onOk: () => {
                                                DelUser({ userName: params.row.name }).then(res => {
                                                    if (res) {
                                                        this.$Message.success('用户删除成功!')
                                                        this.userModel = false
                                                        this.GetUser()
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ]
        }
    },
    mounted() {
        this.GetUser()
        this.GetOrganization()
        this.GetRoles()
    },
    methods: {
        GotoAddMine() {

        },
        // 获取所有用户
        GetUser() {
            GetUser(this.SearchData).then(res => {
                this.UserList = res || []
            })
        },
        // 获取单位
        GetOrganization() {
            GetOrganization().then(res => {
                this.organizationArr = res || []
            })
        },
        // 获取角色
        GetRoles() {
            GetRoles().then(res => {
                this.rolesArr = res || []
            })
        },
        // 新增用户
        addUser(type) {
            this.userModel = true
            this.subType = type
        },
        // 改变tab切换
        ChangeTab(type) {
            this.tabType = type
        },
        // 提交核查登记
        handleSubmit(name) {
            const formData = Object.assign({}, this.formValidate)
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.tabType === 'user') {
                        if (this.subType === 'add') { // 新增
                            AddUser(formData).then(res => {
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
                        } else { // 修改
                            EditUserInfo(formData).then(res => {
                                if (res) {
                                    this.$Message.success('用户信息修改成功!')
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
                    } else { // 修改用户权限
                        const roleForm = []
                        this.rolesArr.forEach(item => {
                            if (item.checked) {
                                roleForm.push({
                                    roleName: item.name,
                                    userName: this.formValidate.name,
                                    isSetIn: true
                                })
                            } else {
                                roleForm.push({
                                    roleName: item.name,
                                    userName: this.formValidate.name,
                                    isSetIn: false
                                })
                            }
                        })
                        SetUserRole(roleForm).then(res => {
                            this.$Message.success('用户信息修改成功!')
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
                        })
                    }
                } else {
                    setTimeout(() => {
                        this.userModelLoading = false
                        this.$nextTick(() => {
                            this.userModelLoading = true
                        })
                    }, 500)
                }
            })
        },
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields()
        },
        // 查询用户
        SearchUser() {
            this.GetUser()
        }
    }

}
</script>
