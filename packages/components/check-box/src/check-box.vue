<template>
    <div v-disabled="disabled"
         data-flex-center
         data-none-select
         data-pointer
         data-transition-fast
         style="display: inline-flex"
         @click="click">
        <slot/>
        <div ref="checkBoxEle"
             :data-checked="checked?'':undefined"
             :data-size="size"
             class="h-check-box"
             data-relative
             data-transition-fast/>
    </div>

</template>

<script lang="ts" setup>

import {HCheckBoxProps} from "./check-box"
import {cssVar, cssVarName, vDisabled} from '../../../utils'
import {onMounted, ref, watch} from "vue";
import {convertColor, isDefinedNamedColor} from "../../../types"

const checkBoxEle = ref<HTMLDivElement>()

const props = withDefaults(defineProps<HCheckBoxProps>(), {
    size: 'normal',
    onColor: '',
    offColor: ''
})
const checked = defineModel<boolean>()

function click() {
    checked.value = !checked.value
}

function changeColor(type: 'on' | 'off', color: string) {
    if (color === '') {
        checkBoxEle.value!.style.removeProperty(cssVarName(`check-box-${type}-color`))
    } else {
        checkBoxEle.value!.style.setProperty(cssVarName(`check-box-${type}-color`),
            convertColor(color)
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
