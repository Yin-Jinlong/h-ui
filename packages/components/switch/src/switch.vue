<template>
    <div v-disabled="disabled"
         :data-on="on?'':undefined"
         :data-size="size"
         ref="switchEle"
         class="h-switch"
         data-pointer
         data-relative
         data-transition
         @click="on = !on">

    </div>
</template>

<script lang="ts" setup>
import {HSwitchProps} from './switch'
import {cssVar, isDark, vDisabled} from '../../../utils'
import {onMounted, ref, watch} from "vue"
import {isDefinedNamedColor} from "../../../types"
import {cssVarName} from "../../../utils"

const props = withDefaults(defineProps<HSwitchProps>(), {
    size: 'normal',
    onColor: '',
    offColor: '',
})

const switchEle = ref<HTMLDivElement>()

const on = defineModel<boolean>()

function changeColor(type: 'on' | 'off', color: string) {
    if (color === '') {
        switchEle.value!.style.removeProperty(cssVarName(`switch-${type}-color`))
    } else {
        switchEle.value!.style.setProperty(cssVarName(`switch-${type}-color`),
            isDefinedNamedColor(color) ? cssVar(`color-${color}`) : color
        )
    }
}

onMounted(() => {
    changeColor('on', props.onColor)
    changeColor('off', props.offColor)
})

watch(() => props.onColor, (c) => {
    changeColor('on', c)
})

watch(() => props.offColor, (c) => {
    changeColor('off', c)
})

</script>
