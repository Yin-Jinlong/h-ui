<template>
    <h2>Props : {{ api.propsExtends?.join(',') }}</h2>
    <table data-fill-width>
        <thead>
        <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认</th>
        </tr>
        </thead>
        <tr v-for="p in api.props">
            <td>{{ p.name }}</td>
            <td>{{ p.description }}</td>
            <td>{{ p.type }}</td>
            <td></td>
        </tr>
    </table>
</template>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
}

td, th {
    border-bottom: 1px solid var(--h-color-primary);
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    border-top: 1px solid var(--h-color-primary);

    &:first-child {
        border-left: none;
    }

    &:last-child {
        border-right: none;
    }

}

</style>

<script lang="ts" setup>
import type {VueComponent} from '../../../../../packages/build-utils/webtypes'

defineProps<{
    api: VueComponent
}>()
</script>
