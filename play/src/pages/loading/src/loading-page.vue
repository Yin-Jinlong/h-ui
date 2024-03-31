<template>
    <h-card v-loading="true"
            data-relative>
        <template #header>
            Title
        </template>
        <template #default>
            Content
        </template>
    </h-card>
    <div v-loading.fullscreen="loading"
         h-loading-text="加载中...">
        <h-button type="primary" @click="load">
            全屏加载
        </h-button>
    </div>
    <div v-loading="loadingIn" data-relative style="width: max-content;margin-top: 1em">
        <h-button type="primary" @click="loadIn">
            加载
        </h-button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {HCard, vLoading, HButton} from '@yin-jinlong/h-ui'
import {ref} from "vue";

const loading = ref(false)
const loadingIn = ref(false)

function load() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
}

function loadIn() {
    loadingIn.value = true
    setTimeout(() => {
        loadingIn.value = false
    }, 2000)
}

</script>
