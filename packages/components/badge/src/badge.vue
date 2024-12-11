<template>
    <sup v-if="typeof value==='number'?value>=min:value?.length"
         :data-dot="dot?'':undefined"
         :style="{[cssVarName('badge-color')]: convertColor(color?.toString())}"
         class="h-badge">
        {{ getValue() }}
    </sup>
</template>

<script lang="ts" setup>
import {convertColor, cssVarName} from '@yin-jinlong/h-ui/utils'
import DefaultProps, {HBadgeProps} from './props'

const props = withDefaults(defineProps<HBadgeProps>(), DefaultProps)

function getValue() {
    if (props.dot)
        return ''
    if (typeof props.value === 'string')
        return props.value
    if (props.value > props.max) {
        switch (props.overflow) {
            case 'max-plus':
                return props.max + '+'
            case 'dot':
                let len = Math.floor(Math.log10(props.value))
                return '•'.repeat(len)
            default:
                return props.max
        }
    }
    return props.value
}

</script>
