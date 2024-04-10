<template>
    <h-card v-loading
            data-relative
            h-loading-text="加载中...">
        <template #header>
            标题
        </template>
        <template #default>
            内容
        </template>
    </h-card>
</template>

<script lang="ts" setup>
import {HCard, vLoading} from '@yin-jinlong/h-ui'
</script>
