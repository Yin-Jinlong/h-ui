<template>
    <h-check-box v-model="disabled">禁用</h-check-box>
    <div>
        <h-switch v-model="value" :disabled="disabled" on-color="primary">Primary</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="success">success</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="warning">warning</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="danger">danger</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="info">info</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="emphasize">emphasize</h-switch>
        <h-switch v-model="value" :disabled="disabled" on-color="#39e">自定义</h-switch>
        <h-switch v-model="value" :disabled="disabled" off-color="danger" on-color="success">自定义</h-switch>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {HCheckBox, HSwitch} from '@yin-jinlong/h-ui'

const disabled = ref(false)
const value = ref(true)
</script>
