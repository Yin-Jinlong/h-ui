<template>
    <h-card class="case">
        <component :is="component"/>
        <template #footer>
            <h-button class="show-code" @click="showCode=!showCode">
                {{ showCode ? '隐藏' : '显示' }}代码
            </h-button>
            <div v-auto-height class="code-box" data-relative data-transition-fast>
                <div :data-show="showCode" :style="'height:'+(showCode?'max-content':'0px')">
                    <div v-if="showCode"/>
                    <code-box :light="codeLight" :dark="codeDark"/>
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
import {CodeBox} from '@components'
import type {Component} from 'vue'
import {ref} from 'vue'
import {HButton, HCard, vAutoHeight} from '@yin-jinlong/h-ui'

import '@yin-jinlong/h-ui/components/button/style'
import '@yin-jinlong/h-ui/components/card/style'

defineProps<{
    component: Component
    codeDark: string
    codeLight: string
}>()

const showCode = ref(false)

</script>
