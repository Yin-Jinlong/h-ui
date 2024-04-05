<template>
    <case-card :code="colorsCode" :component="Colors" title="颜色&禁用"/>
    <case-card :code="sizesCode" :component="Sizes" title="大小"/>
    <case-card :code="typesCode" :component="Types" title="类型&禁用"/>
</template>

<script lang="ts" setup>
import {CaseCard} from "@components"

import Colors from "./colors.vue"
import Sizes from "./sizes.vue"
import Types from "./types.vue"

import colorsCode from './colors.vue?raw'
import sizesCode from './sizes.vue?raw'
import typesCode from "./types.vue?raw"

</script>
