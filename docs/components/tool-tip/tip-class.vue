<template>
    <h-tool-tip tip-class="tip">
        <h-button type="primary">自定义</h-button>
        <template #tip>
            加阴影
        </template>
    </h-tool-tip>
</template>

<style lang="scss">
.tip {
    box-shadow: #1E1F22 0 0 4px;
}
</style>

<script setup lang="ts">
import {HButton, HToolTip} from '@yin-jinlong/h-ui'
</script>
