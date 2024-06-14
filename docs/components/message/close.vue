<template>
    <h-button @click="noClose" type="primary" color="info">不带关闭</h-button>
    <h-button @click="show" type="primary" color="primary">无限显示</h-button>
    <h-button @click="closeById" type="plain" color="danger">指定id关闭（最后一个消息）</h-button>
    <h-button @click="closeAll" type="primary" color="danger">关闭所有</h-button>
</template>

<script setup lang="ts">
import {HButton, HMessage} from '@yin-jinlong/h-ui'

let showIds: number[] = []

function show() {
    showIds.push(HMessage.show('无限显示', {
        duration: 0, onClose(id) {
            HMessage.success('关闭啦！id:' + id, {
                duration: 1000
            })
        },
    }))
}

function noClose() {
    HMessage.info('不带关闭', {
        closeable: false
    })
}

function closeById() {
    HMessage.close(showIds.pop() ?? 0)
}

function closeAll() {
    HMessage.closeAll()
}

</script>
