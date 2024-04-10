<template>
    <h-check-box v-model="loading">加载</h-check-box>
    <div data-flex style="flex-wrap: wrap">
        <div v-for="c in DefinedNamedColors">
            <h-card v-loading="{loading,color:c}"
                    data-relative
                    h-loading-text="加载中...">
                <template #header>
                    标题
                </template>
                <template #default>
                    {{ c }}
                </template>
            </h-card>
        </div>
        <h-card v-loading="{loading,color:'#39e'}"
                data-relative
                h-loading-text="加载中...">
            <template #header>
                标题
            </template>
            <template #default>
                自定义
            </template>
        </h-card>
    </div>
    <div data-flex style="flex-wrap: wrap">
        <h-card v-loading="{loading,modal:'rgb(0,0,0,0.4)'}"
                data-relative
                h-loading-text="加载中...">
            <template #header>
                标题
            </template>
            <template #default>
                背景色
            </template>
        </h-card>
        <h-card v-loading="{loading,modal:false}"
                data-relative
                h-loading-text="加载中...">
            <template #header>
                标题
            </template>
            <template #default>
                无背景色
            </template>
        </h-card>
        <h-card v-loading="{loading,modal:'info'}"
                data-relative
                h-loading-text="加载中...">
            <template #header>
                标题
            </template>
            <template #default>
                不透明
            </template>
        </h-card>
    </div>
</template>

<script lang="ts" setup>
import {DefinedNamedColors, HCard, HCheckBox, vLoading} from '@yin-jinlong/h-ui'
import {ref} from 'vue'

const loading = ref(true)
</script>
