<template>
    <div ref="switchEle"
         v-disabled="disabled"
         :data-on="on?'':undefined"
         :data-size="size"
         class="h-switch"
         data-pointer
         data-relative
         data-transition
         @click="on = !on">
        <div class="action">
            <slot :value="on" name="action">
                <span v-if="actionText">{{ on ? '开' : '关' }}</span>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

import {vDisabled, convertColor, cssVarName} from '@yin-jinlong/h-ui/utils'

import DefaultProps, {HSwitchProps} from './props'


const props = withDefaults(defineProps<HSwitchProps>(), DefaultProps)

const switchEle = ref<HTMLDivElement>()

const on = defineModel<boolean>()

function changeColor(type: 'on' | 'off', color: String) {
    if (color === '') {
        switchEle.value!.style.removeProperty(cssVarName(`switch-${type}-color`))
    } else {
        switchEle.value!.style.setProperty(cssVarName(`switch-${type}-color`),
            convertColor(color.toString())
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
