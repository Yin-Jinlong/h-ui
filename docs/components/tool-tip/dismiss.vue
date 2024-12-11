<template>
    <h-tool-tip>
        <h-button type="primary">默认</h-button>
        <template #tip>
            0.2s
        </template>
    </h-tool-tip>
    <h-tool-tip :dismiss-delay="5000" style="margin-left: 1em">
        <h-button type="primary">1s</h-button>
        <template #tip>
            1s
        </template>
    </h-tool-tip>
</template>

<script lang="ts" setup>
import {HButton, HToolTip} from '@yin-jinlong/h-ui'
</script>
