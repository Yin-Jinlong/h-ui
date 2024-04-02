<template>
    <h-card>
        <template #header>
            类型
        </template>
        <types/>
        <template #footer>
            <div v-code="typesCode"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            颜色
        </template>
        <colors/>
        <template #footer>
            <div v-code="colorsCode"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            大小
        </template>
        <sizes/>
        <template #footer>
            <div v-code="sizesCode"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            边框
        </template>
        <borders/>
        <template #footer>
            <div v-code="bordersCode"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            阴影&禁用
        </template>
        <shadows/>
        <template #footer>
            <div v-code="shadowCode"></div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>

.h-card {
  max-width : calc(100% - 1em);
}

</style>

<script lang="ts" setup>

import {HCard} from '@yin-jinlong/h-ui'

import Colors from "./colors.vue"
import Borders from "./borders.vue"
import Sizes from "./sizes.vue"
import Shadows from "./shadows.vue"
import Types from "./types.vue"

import colorsCode from './colors.vue?raw'
import bordersCode from "./borders.vue?raw"
import shadowCode from "./shadows.vue?raw"
import sizesCode from './sizes.vue?raw'
import typesCode from "./types.vue?raw"

</script>
