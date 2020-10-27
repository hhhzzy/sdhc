<template>
    <Tooltip placement="right" style="margin-left:10px;">
        <p style="margin-left:-10px;">{{ parentItem.meta.title }}</p>
        <template slot="content">
            <template v-for="item in parentItem.children">
                <div :key="`menu-collapsed-${item.name}`" :class="[(parentItem.children && parentItem.children.length == 1)?'':'menu-collapsed-item']">
                    <template v-if="!item.hidden">
                        <CollapsedMenuItem v-if="showChildren(item)" :parent-item="item" />
                        <p v-else @click="handleSelect(getName(item))">{{ item.meta.title }}</p>
                    </template>
                </div>
            </template>
        </template>
    </Tooltip>
</template>
<script>
import mixin from './mixin'
export default {
    name: 'CollapsedMenuItem',
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

