<template>
    <div>
        <h-button v-for="c in DefinedNamedColors" @click="()=>{show(c,c)}" type="primary" :color="c">{{ c }}</h-button>
        <h-button @click="()=>{show('自定义颜色','#39e')}" type="primary" color="#39e">自定义颜色</h-button>
    </div>

</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import {DefinedNamedColors, HButton, HMessage} from '@yin-jinlong/h-ui'

function show(msg: string, color: string) {
    HMessage.show(msg, {color})
    // 也可以直接使用
    // HMessage.primary(msg)
    // HMessage.success(msg)
    // HMessage.warning(msg)
    // HMessage.error(msg)
    // HMessage.danger(msg)
    // HMessage.info(msg)
    // HMessage.emphasize(msg)
}
</script>
