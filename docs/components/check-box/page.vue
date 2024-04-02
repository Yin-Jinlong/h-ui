<template>
    <h-card>
        <template #header>
            颜色&禁用
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
</template>

<style lang="scss" scoped>

.h-card {
  max-width : calc(100% - 1em);
}

</style>

<script lang="ts" setup>

import {HCard} from '@yin-jinlong/h-ui'

import Colors from "./colors.vue"
import Sizes from "./sizes.vue"

import colorsCode from './colors.vue?raw'
import sizesCode from './sizes.vue?raw'

</script>
