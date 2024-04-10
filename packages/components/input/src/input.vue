<template>
    <input ref="inputEle"
           v-model="value"
           v-disabled="disabled"
           :data-border="border?'':undefined"
           :data-size="size"
           :disabled="disabled"
           :maxlength="maxlength"
           :placeholder="placeholder"
           :type="type"
           class="h-input"
           data-transition/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

import {vDisabled, convertColor, cssVarName} from '@yin-jinlong/h-ui/utils'

import DefaultProps, {HInputProps} from './props'


const props = withDefaults(defineProps<HInputProps>(), DefaultProps)

const inputEle = ref<HTMLInputElement>()

const value = defineModel<string>()

function changeColor(color: string, suffix: string = '') {
    if (color === '') {
        inputEle.value!.style.removeProperty(cssVarName(`input${suffix}-color`))
    } else {
        inputEle.value!.style.setProperty(cssVarName(`input${suffix}-color`),
            convertColor(color)
        )
    }
}

onMounted(() => {
    changeColor(props.color)
    changeColor(props.textColor, '-text')
})

watch(() => props.color, (c) => {
    changeColor(c)
})

watch(() => props.textColor, (c) => {
    changeColor(c, '-text')
})

</script>
