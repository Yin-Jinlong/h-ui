<template>
    <h-button @click="()=>{show('默认','primary')}" type="primary" color="primary">默认</h-button>
    <h-button @click="()=>{show('短','success',1000)}" type="primary" color="success">短</h-button>
    <h-button @click="()=>{show('长','emphasize',5000)}" type="primary" color="emphasize">长</h-button>
    <br>
    <div style="margin-top: 1rem">
        <h-button @click="closeById" type="plain" color="danger">指定id关闭（最后一个消息）</h-button>
    </div>
    <div style="margin-top: 1rem">
        <h-button @click="closeAll" type="primary" color="danger">关闭所有</h-button>
    </div>
</template>

<script setup lang="ts">
import {HButton, HMessage} from '@yin-jinlong/h-ui'

let lastId = 0

function show(msg: string, color: string, duration?: number) {
    lastId = HMessage.show(msg, {color, duration})
}

function closeById() {
    HMessage.close(lastId)
}

function closeAll() {
    HMessage.closeAll()
}

</script>
