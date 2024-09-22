<template>
    <div :style="{
        [cssVarName('badge-color')]: convertColor(color?.toString())
    }" class="h-badge" data-relative>
        <slot name="default"/>
        <sup v-if="typeof value==='number'?value>=min:value?.length" class="h-badge-dot">
            {{ getValue() }}
        </sup>
    </div>
</template>

<script lang="ts" setup>
import {convertColor, cssVarName} from '@yin-jinlong/h-ui/utils'
import DefaultProps, {HBadgeProps} from './props'

const props = withDefaults(defineProps<HBadgeProps>(), DefaultProps)

function getValue() {
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
