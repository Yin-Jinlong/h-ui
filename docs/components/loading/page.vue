<template>
    <h-card>
        <template #header>
            块内
        </template>
        <loading/>
        <template #footer>
            <div v-code="loadingCOde"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            加载文字
        </template>
        <load-text/>
        <template #footer>
            <div v-code="textCode"></div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            全屏
        </template>
        <fullscreen/>
        <template #footer>
            <div v-code="fullscreenCOde"></div>
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

import Loading from "./loading.vue"
import Fullscreen from "./fullscreen.vue"
import LoadText from "./text.vue"

import loadingCOde from "./loading.vue?raw"
import fullscreenCOde from "./fullscreen.vue?raw"
import textCode from "./text.vue?raw"

</script>
