<template>
    <h-card v-loading.fullscreen="loading"
            data-relative
            h-loading-text="加载中...">
        <template #header>
            全屏
        </template>
        <template #default>
            <h-button type="primary" @click="load">全屏加载</h-button>
            <h-button v-loading.inner type="primary">内部</h-button>
            <h-button v-disabled v-loading.inner type="primary">内部+禁用</h-button>
        </template>
    </h-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {HButton, HCard, vLoading, vDisabled} from '@yin-jinlong/h-ui'

const loading = ref(false)

function load() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
}
</script>
