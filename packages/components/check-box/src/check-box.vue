<template>
    <div :data-checked="checked?'':undefined"
         class="h-check-box"
         data-pointer
         :data-size="size"
         data-relative
         data-transition-fast
         @click="click">
    </div>
</template>

<script lang="ts" setup>

import {HCheckBoxProps} from "./check-box"

const props = withDefaults(defineProps<HCheckBoxProps>(), {
    size: 'normal',
})
const checked = defineModel<boolean>()

function click() {
    checked.value = !checked.value
}

</script>
