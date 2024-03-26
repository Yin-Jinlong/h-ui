<template>
    <div v-disabled="disabled"
         :data-checked="checked?'':undefined"
         :data-size="size"
         class="h-check-box"
         data-pointer
         data-relative
         data-transition-fast
         @click="click">
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
