<template>
    <button ref="btn"
            v-disabled="disabled"
            :data-border="border?'':undefined"
            :data-round="round?'':undefined"
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
import {onMounted, ref, watch} from 'vue'

import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'
import {vDisabled, cssVarName} from '@yin-jinlong/h-ui/utils'

import DefaultProps, {HButtonProps} from './props'
import {genColor} from './color-tool'

const props = withDefaults(defineProps<HButtonProps>(), DefaultProps)
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
    changeColor(color.toString())
})

watch(() => props.color, (c?: String) => {
    if (!c)
        return
    changeColor(c.toString())
})

</script>
