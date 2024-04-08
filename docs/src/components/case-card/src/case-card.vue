<template>
    <h-card class="case">
        <template #header>
            {{ title }}
        </template>
        <component :is="component"/>
        <template #footer>
            <h-button class="show-code" @click="showCode=!showCode">
                {{ showCode ? '隐藏' : '显示' }}代码
            </h-button>
            <div v-auto-height class="code-box" data-relative data-transition-fast>
                <div :style="'height:'+(showCode?'auto':'0px')">
                    <div v-code="code"/>
                </div>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.case {
  width : calc(100% - 5px);
}

.show-code {
  color : var(--h-color-primary);
  width : 100%;
}

.code-box {
  overflow : hidden;
}

</style>

<script lang="ts" setup>
import type {Component} from "vue"
import {ref} from "vue"
import {HButton, HCard, vAutoHeight} from "@yin-jinlong/h-ui"

defineProps<{
    title: string
    component: Component
    code: string
}>()

const showCode = ref(false)

</script>
