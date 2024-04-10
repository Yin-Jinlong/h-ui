<template>
    <div>
        <h-switch v-model="value" size="small">small</h-switch>
        <h-switch v-model="value" size="normal">normal</h-switch>
        <h-switch v-model="value" size="large">large</h-switch>
        <h-switch v-model="value" size="xlarge">xlarge</h-switch>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {HSwitch} from '@yin-jinlong/h-ui'

const value = ref(true)
</script>
