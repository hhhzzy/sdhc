<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" v-model="isCollapsed" hide-trigger collapsible :collapsed-width="55">
                <Sidebar :is-collapsed="isCollapsed" :permission-routes="permission_routes" />
            </Sider>
            <Layout :style="{width:isCollapsed?'calc(100% - 55px)':'calc(100% - 200px)',transform: 'scale3d(1, 1, 1)'}">
                <Header class="layout-header-bar" :style="{padding: 0}">
                    <Icon :class="rotateIcon" :style="{margin: '13px',float:'left'}" type="md-menu" size="24" @click.native="collapsedSider" />
                    <BreadCrumb class="bread-crumb" />
                    <div class="layout-logo">
                        <Dropdown trigger="click" @on-click="ClkDrop">
                            <p class="logo">
                                <img src="../assets/address.png" alt="" />
                            </p>
                            <DropdownMenu slot="list">
                                <DropdownItem>个人信息</DropdownItem>
                                <DropdownItem>修改密码</DropdownItem>
                                <DropdownItem name="signOut" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>
                <!-- <div class="tag-nav-box">
                    <TagNav />
                </div> -->
                <Content class="content-box">
                    <div class="container-box">
                        <router-view />
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Sidebar from './components/Sidebar/index'
import BreadCrumb from './components/Breadcrumb/breadCrumb'
// import TagNav from './components/TagNav/tagNav'
export default {
    components: {
        Sidebar,
        BreadCrumb
        // TagNav
    },
    data() {
        return {
            isCollapsed: false
        }
    },
    computed: {
        rotateIcon() {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ]
        },

        ...mapGetters([
            'permission_routes'
        ]),
        ...mapState({
            token: state => state.user.token
        })
    },
    mounted() {
    },
    methods: {
        ...mapActions({
            signOut: 'user/signOut'
        }),
        collapsedSider() {
            this.$refs.side1.toggleCollapse()
        },
        ClkDrop(name) {
            if (name === 'signOut') {
                this.signOut().then(res => {
                    this.$router.push({
                        path: `/login?redirect=${this.$route.path}` // 退出后重新登录回到当前页面
                    })
                })
            }
        }
    }
}
</script>
<style lang="less">
@import url('../styles/sidebar.less');

</style>
