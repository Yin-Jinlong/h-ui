<template>
    <h-card class="case">
        <component :is="component"/>
        <template #footer>
            <h-button class="show-code" @click="showCode=!showCode">
                {{ showCode ? '隐藏' : '显示' }}代码
            </h-button>
            <div v-auto-height class="code-box" data-relative data-transition-fast>
                <div :data-show="showCode" :style="'height:'+(showCode?'max-content':'0px')">
                    <code-box v-if="showCode" :code="code"/>
                </div>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.case {
    width: calc(100% - 5px);
}

.show-code {
    color: var(--h-color-primary);
    width: 100%;
}

.code-box {
    overflow: hidden;
}

</style>

<script lang="ts" setup>
import type {Component} from 'vue'
import {ref} from 'vue'
import {CodeBox} from '@components'
import {HButton, HCard, vAutoHeight} from '@yin-jinlong/h-ui'

defineProps<{
    component: Component
    code: string
}>()

const showCode = ref(false)

</script>
