<template>
    <button
            ref="btn"
            v-disabled="disabled"
            :data-border="border"
            :data-shadow="shadow"
            :data-size="size"
            :data-type="type"
            :tabindex="disabled?-1:0"
            class="h-button"
            data-break-line
            data-pointer
            data-relative
            data-transition>
        <slot/>
    </button>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue"

import type {DefinedNamedColor} from "@yin-jinlong/h-ui/types"
import {vDisabled, cssVarName} from "@yin-jinlong/h-ui/utils"

import type {HButtonProps} from "./props"
import {genColor} from "./color-tool"
defineModel()
const props = withDefaults(defineProps<HButtonProps>(), {
    type: '',
    border: false,
    shadow: false,
    size: 'normal'
})
const btn = ref<HTMLButtonElement>()


function changeColor(color: DefinedNamedColor | string) {
    let btnColors = genColor(color, 6, 5)
    const style = btn.value!.style
    style.setProperty(cssVarName('button-color'), btnColors[0])
    for (let i = 1; i <= 6; i++)
        style.setProperty(cssVarName(`button-color-${i}`), btnColors[i])
    for (let i = 1; i <= 5; i++)
        style.setProperty(cssVarName(`button-color--${i}`), btnColors[6 + i])
}

onMounted(() => {
    let color = props.color
    if (!color)
        return
    changeColor(color)
})

watch(() => props.color, (c: string | undefined) => {
    if (!c)
        return
    changeColor(c)
})

</script>
