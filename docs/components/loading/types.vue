<template>
    <h-card v-loading="{loading:true, component:'circle'}"
            data-relative
            h-loading-text="加载中...">
        <template #header>
            标题
        </template>
        <template #default>
            内容
            <br>
            圆圈
        </template>
    </h-card>
    <h-card v-loading="{loading:true,component:'running'}"
            data-relative
            h-loading-text="加载中...">
        <template #header>
            标题
        </template>
        <template #default>
            内容
            <br>
            奔跑
        </template>
    </h-card>
</template>

<script lang="ts" setup>
import {HCard, vLoading} from "@yin-jinlong/h-ui"
</script>
