<template>
    <h-check-box v-model="disabled">禁用</h-check-box>
    <div>
        <h-check-box v-model="value" :disabled="disabled" on-color="primary">Primary</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="success">success</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="warning">warning</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="danger">danger</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="info">info</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="emphasize">emphasize</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" on-color="#39e">自定义</h-check-box>
        <h-check-box v-model="value" :disabled="disabled" off-color="danger" on-color="success">自定义</h-check-box>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {HCheckBox} from '@yin-jinlong/h-ui'

const disabled = ref(false)
const value = ref(true)
</script>
