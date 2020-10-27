<template>
    <Submenu :name="parentItem.name">
        <template slot="title">
            <Icon v-if="parentItem.meta.icon" :type="parentItem.meta.icon" />
            <span> {{ parentItem.meta.title }}</span>
        </template>
        <template v-for="item in parentItem.children">
            <template v-if="!item.hidden">
                <subMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
                <MenuItem v-else :key="`menu-${item.name}`" :name="getName(item)">{{ item.meta.title }}</MenuItem>
            </template>
        </template>
    </Submenu>
</template>
<script>
import mixin from './mixin'
export default {
    name: 'SubMenuItem',
    mixins: [mixin],
    props: {
        parentItem: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    methods: {
    }
}
</script>

