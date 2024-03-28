<template>
    <div v-disabled="disabled"
         :data-on="on?'':undefined"
         :data-size="size"
         class="h-switch"
         data-pointer
         data-relative
         data-transition
         @click="on = !on">

    </div>
</template>

<script lang="ts" setup>
import {HSwitchProps} from './switch'
import {vDisabled} from '../../../utils'

withDefaults(defineProps<HSwitchProps>(), {
    size: 'normal'
})

const on = defineModel<boolean>()

</script>
