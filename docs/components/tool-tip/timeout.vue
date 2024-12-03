<template>
    <h-tool-tip>
        <h-button type="primary">默认</h-button>
        <template #tip>
            2s
        </template>
    </h-tool-tip>
    <h-tool-tip :timeout="5000" style="margin-left: 1em">
        <h-button type="primary">5s</h-button>
        <template #tip>
            5s
        </template>
    </h-tool-tip>
</template>

<script lang="ts" setup>
import {HButton, HToolTip} from '@yin-jinlong/h-ui'
</script>
