<template>
    <h-tool-tip v-for="p in PLACES" :place="p as any">
        <h-button style="margin: 0 0.3em" type="primary">{{ p }}</h-button>
        <template #tip>
            {{ p }}
        </template>
    </h-tool-tip>
</template>

<script setup lang="ts">
import {HButton, HToolTip} from '@yin-jinlong/h-ui'

const PLACES = ['auto', 'left', 'top', 'right', 'bottom']

</script>
