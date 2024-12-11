<template>
    <h-button color="primary" type="primary" @click="merge(1)">合并消息1</h-button>
    <h-button color="primary" type="primary" @click="merge(2)">合并消息2</h-button>
</template>

<script lang="ts" setup>
import {HButton, HMessage} from '@yin-jinlong/h-ui'

function merge(i: number) {
    HMessage.primary(`消息${i}`, {
        mergeId: i.toString(),
    })
}

</script>
