<template>
    <h-check-box v-model="disabled">禁用</h-check-box>
    <div v-for="t in types" style="margin: 0.5em 0">
        <h-input :disabled="disabled" :placeholder="t" :type="t"/>
        <br>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {HInputType, HCheckBox, HInput} from '@yin-jinlong/h-ui'

const types: HInputType[] = [
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'tel',
    'text',
    'time',
    'url',
    'week'
]

const disabled = ref(false)

</script>
