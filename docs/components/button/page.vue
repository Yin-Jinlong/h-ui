<template>
    <case-card :code="typesCode" :component="Types" title="类型"/>
    <case-card :code="colorsCode" :component="Colors" title="颜色"/>
    <case-card :code="sizesCode" :component="Sizes" title="大小"/>
    <case-card :code="bordersCode" :component="Borders" title="边框"/>
    <case-card :code="shadowCode" :component="Shadows" title="阴影&禁用"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {CaseCard} from "@components"

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
