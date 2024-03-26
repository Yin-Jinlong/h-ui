<template>
    <div v-disabled="disabled"
         data-flex-center
         data-none-select
         data-pointer
         data-transition-fast
         style="display: inline-flex"
         @click="click">
        <slot/>
        <div
                :data-checked="checked?'':undefined"
                :data-size="size"
                class="h-check-box"
                data-relative
                data-transition-fast/>
    </div>

</template>

<script lang="ts" setup>

import {HCheckBoxProps} from "./check-box"
import {vDisabled} from '../../../utils'

const props = withDefaults(defineProps<HCheckBoxProps>(), {
    size: 'normal',
})
const checked = defineModel<boolean>()

function click() {
    checked.value = !checked.value
}

</script>
