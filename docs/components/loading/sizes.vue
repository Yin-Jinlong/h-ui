<template>
    <div data-flex>
        <h-card v-loading
                data-relative
                h-loading-text="加载中...">
            <template #header>
                标题
            </template>
            <template #default>
                默认
            </template>
        </h-card>
        <h-card v-loading="{size: '60px'}"
                data-relative
                h-loading-text="指定大小...">
            <template #header>
                标题
            </template>
            <template #default>
                指定大小
            </template>
        </h-card>
        <h-card v-loading="{width: '25%'}"
                data-relative
                h-loading-text="指定宽度...">
            <template #header>
                标题
            </template>
            <template #default>
                指定宽度
            </template>
        </h-card>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {HCard, vLoading} from "@yin-jinlong/h-ui"
</script>
