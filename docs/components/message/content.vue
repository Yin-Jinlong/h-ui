<template>
    <h-button color="primary" type="primary" @click="str">字符串</h-button>
    <h-button color="primary" type="primary" @click="cpn">组件</h-button>
</template>

<script lang="ts" setup>
import {HButton, HMessage} from '@yin-jinlong/h-ui'
import {h} from 'vue'

function str() {
    HMessage.primary('字符串')
}

function cpn() {
    let r=h(HButton,{
        type:'primary',
        color:'success'
    },['组件'])
    HMessage.primary(r)
}

</script>
