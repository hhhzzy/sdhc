<template>
    <div>
        <Menu v-show="!isCollapsed" ref="menu" :active-name="$route.name" :open-names="openedNames" theme="dark" width="auto" :class="menuitemClasses" accordion @on-select="handleSelect">
            <template v-for="(item) in permissionRoutes">  <!-- 一级  -->
                <template v-if="!item.hidden">
                    <subMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" /> <!-- 调用二级,有多个子路由  -->
                    <template v-else>
                        <MenuItem :key="`menu-${item.name}`" :name="getName(item)">
                            <Icon v-if="item.meta.icon" :type="item.meta.icon" />
                            <span>
                                {{ item.meta.title }}
                            </span>
                        </MenuItem>
                    </template>
                </template>
            </template>
        </Menu>
        <!--       缩小菜单     -->
        <Menu v-show="isCollapsed" theme="dark" width="auto" :class="menuitemClasses">
            <template v-for="(item) in permissionRoutes">  <!-- 一级  -->
                <template v-if="!item.hidden">
                    <Tooltip :key="`menu-collapsed-${item.name}`" placement="right" class="menu-collapsed">
                        <Icon v-if="item.meta.icon" :type="item.meta.icon" />
                        <template slot="content">
                            <collapsedMenu :key="`collapsed-${item.name}`" :parent-item="item" @on-select="handleSelect" />
                            <!-- <Tooltip placement="right">
                                <p>Right Center</p>
                                <template slot="content">
                                    <Tooltip content="9999999" placement="right">
                                        <p>Right Center</p>
                                    </Tooltip>
                                </template>
                            </Tooltip> -->
                        </template>
                    </Tooltip>

                </template>
            </template>
        </Menu>
    </div>
</template>
<script>
import subMenuItem from './subMenuItem'
import collapsedMenu from './collapsedMenu'
import mixin from './mixin'
export default {
    name: 'Sidebar',
    components: {
        subMenuItem,
        collapsedMenu
    },
    mixins: [mixin],
    props: {
        isCollapsed: {
            type: Boolean,
            default: false
        },
        permissionRoutes: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            openedNames: [] // 选中的展开节点
        }
    },
    computed: {
        menuitemClasses() {
            return [
                'menu-item'
            ]
        }
    },
    watch: {
        '$route'(newRoute) {
        },
        'isCollapsed'(newValue) {
            if (!newValue) {
                this.openedNames = []
                this.openedNames = this.getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.$route.name))
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                })
            }
        }
    },
    created() {
        this.openedNames = this.getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.$route.name))
    },
    mounted() {
    },
    methods: {
        // 获取左边菜单的当前展开路由
        getOpenedNamesByActiveName(name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        },
        getUnion(arr1, arr2) {
            return Array.from(new Set([...arr1, ...arr2]))
        }
    }
}
</script>
<style scoped lang="less">
</style>

