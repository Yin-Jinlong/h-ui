<template>
    <case-card :code="colorsCode" :component="Colors" title="颜色&禁用"/>
    <case-card :code="sizesCode" :component="Sizes" title="大小"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {CaseCard} from "@components"

import Colors from "./colors.vue"
import Sizes from "./sizes.vue"

import colorsCode from './colors.vue?raw'
import sizesCode from './sizes.vue?raw'

</script>
