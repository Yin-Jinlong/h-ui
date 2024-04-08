<template>
    <case-card :code="loadingCode" :component="Loading" title="块内"/>
    <case-card :code="textCode" :component="LoadText" title="加载文字"/>
    <case-card :code="fullscreenCOde" :component="Fullscreen" title="全屏"/>
    <case-card :code="sizesCode" :component="Sizes" title="大小"/>
    <case-card :code="typesCode" :component="Types" title="不同样式（全局命名注册）"/>
</template>

<style lang="scss" scoped>

.h-card {
  max-width : calc(100% - 1em);
}

</style>

<script lang="ts" setup>
import {CaseCard} from "@components"

import Loading from "./loading.vue"
import Fullscreen from "./fullscreen.vue"
import LoadText from "./text.vue"
import Sizes from "./sizes.vue"
import Types from "./types.vue"

import loadingCode from "./loading.vue?raw"
import fullscreenCOde from "./fullscreen.vue?raw"
import textCode from "./text.vue?raw"
import sizesCode from "./sizes.vue?raw"
import typesCode from "./types.vue?raw"

</script>
