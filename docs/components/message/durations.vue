<template>
    <h-button @click="()=>{show('默认','primary')}" type="primary" color="primary">默认</h-button>
    <h-button @click="()=>{show('短','success',1000)}" type="primary" color="success">短</h-button>
    <h-button @click="()=>{show('长','emphasize',5000)}" type="primary" color="emphasize">长</h-button>
</template>

<script setup lang="ts">
import {HButton, HMessage} from '@yin-jinlong/h-ui'

function show(msg: string, color: string, duration?: number) {
    HMessage.show(msg, {color, duration})
}

</script>
