<template>
    <div class="user-box">
        <div class="btn-box">
            <Row>
                <i-col span="6">
                    <Button style="margin-right:5px;margin-left:5px;" type="primary" @click="AddRole">新增</Button>
                </i-col>
            </Row>
        </div>
        <Table border :columns="columns1" :data="roleArr" />
        <Modal
            v-model="userModel"
            title="新增角色"
            :loading="userModelLoading"
            @on-ok="handleSubmit('formValidate')"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Tabs :value="tabType" @on-click="ChangeTab">
                    <TabPane label="角色" name="role">
                        <FormItem label="角色名称" prop="name">
                            <Input v-model="formValidate.name" placeholder="请输入角色名称" /></Input>
                        </FormItem>
                        <FormItem label="显示名称" prop="aliasName">
                            <Input v-model="formValidate.aliasName" placeholder="请输入显示名称" /></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane v-if="subType != 'add'" label="权限" name="permission">
                        <Tree :data="perArr" show-checkbox multiple :check-strictly="true" />
                    </TabPane>
                </Tabs>
            </Form>

        </Modal>

    </div>
</template>
<script>
import { GetRoles } from '@/api/user'
import { CreateRole, GetRoleInfo, GetRolePerInfo, EditRoleInfo, SetPermission, DeleteRole } from '@/api/role'
export default {
    name: 'User',
    data() {
        return {
            roleArr: [],
            formValidate: {
                name: '',
                aliasName: ''
            },
            tabType: 'role',
            subType: 'add',
            ruleValidate: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'change' }
                ],
                aliasName: [
                    { required: true, message: '请输入显示名称', trigger: 'change' }
                ]
            },
            userModel: false,
            userModelLoading: true,
            perArr: [
                {
                    title: 'parent 1',
                    expand: true,
                    selected: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    disabled: true
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    checked: true
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }],
            columns1: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'name'
                },
                {
                    title: '显示名称',
                    key: 'aliasName'
                },
                {
                    title: '创建时间',
                    key: 'lastLoginTime',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.createTime ? this.$moment(params.row.createTime).format('YYYY-MM-DD') : '')
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
                                        GetRoleInfo(params.row.name).then(res => {
                                            this.formValidate = res || {}
                                        })
                                        GetRolePerInfo(params.row.name).then(res => {
                                            this.perArr = this.RecursionPer(res, 'detail') || []
                                        })
                                    }
                                }
                            }, '编辑'),
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
                                            content: '是否确认删除该角色？',
                                            cancelText: '取消',
                                            onOk: () => {
                                                DeleteRole({ name: params.row.name }).then(res => {
                                                    if (res) {
                                                        this.$Message.success('角色删除成功!')
                                                        this.userModel = false
                                                        this.GetRoles()
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
            ],
            perForm: []
        }
    },
    mounted() {
        this.GetRoles()
    },
    methods: {
        GetRoles() {
            GetRoles().then(res => {
                this.roleArr = res || []
            })
        },
        AddRole() {
            this.userModel = true
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.subType === 'add') {
                        CreateRole(this.formValidate).then(res => {
                            if (res) {
                                this.$Message.success('新增成功！')
                                this.GetRoles()
                                this.userModel = false
                                this.formValidate = {
                                    name: '',
                                    aliasName: ''
                                }
                            }
                        })
                    } else {
                        if (this.tabType === 'role') { // 编辑角色信息
                            EditRoleInfo(this.formValidate).then(res => {
                                this.$Message.success('编辑成功！')
                                this.GetRoles()
                                this.userModel = false
                                this.formValidate = {
                                    name: '',
                                    aliasName: ''
                                }
                            })
                        } else { // 授权
                            this.RecursionPer(this.perArr, 'add')
                            SetPermission({ name: this.formValidate.name, permissionInputs: this.perForm }).then(res => {
                                this.$Message.success('授权成功！')
                                this.GetRoles()
                                this.userModel = false
                                this.perForm = []
                            })
                        }
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
        ChangeTab(name) {
            this.tabType = name
        },
        // 递归循环权限
        RecursionPer(arr, type) {
            if (type === 'detail') {
                if (arr && arr.length) {
                    arr.map(item => {
                        item.checked = item.isGrante
                        if (item.children) {
                            this.RecursionPer(item.children, 'detail')
                        }
                        return item
                    })
                }
                return arr
            } else {
                if (arr && arr.length) {
                    arr.forEach(item => {
                        if (item.checked) {
                            this.perForm.push({
                                permission: item.permission,
                                isGranted: true
                            })
                        } else {
                            this.perForm.push({
                                permission: item.permission,
                                isGranted: false
                            })
                        }
                        if (item.children) {
                            this.RecursionPer(item.children, 'add')
                        }
                    })
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.btn-box{
    margin-bottom: 10px;
}
</style>
