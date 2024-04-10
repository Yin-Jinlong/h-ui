<template>
    <div>
        <h-check-box v-model="value" size="small">small</h-check-box>
        <h-check-box v-model="value" size="normal">normal</h-check-box>
        <h-check-box v-model="value" size="large">large</h-check-box>
        <h-check-box v-model="value" size="xlarge">xlarge</h-check-box>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {HCheckBox} from '@yin-jinlong/h-ui'

const value = ref(true)
</script>
