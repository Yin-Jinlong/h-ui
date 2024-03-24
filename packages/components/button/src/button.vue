<template>
    <button
            ref="btn"
            :data-border="border"
            :data-shadow="shadow"
            :data-size="size"
            :data-type="type"
            class="h-button"
            data-break-line
            data-pointer
            data-transition>
        <slot/>
    </button>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue"
import {DefinedNamedColor} from "../../../types"
import {genColor} from "./color-tool"
import {HButtonProps} from "./button";

const props = withDefaults(defineProps<HButtonProps>(), {
    type: '',
    border: false,
    shadow: false,
    size: 'default'
})
const btn = ref<HTMLButtonElement>()


function changeColor(color: DefinedNamedColor | string) {
    let btnColors = genColor(color, 6, 5)
    const style = btn.value!.style
    style.setProperty('--btn-color', btnColors[0])
    for (let i = 1; i <= 6; i++)
        style.setProperty(`--btn-color-${i}`, btnColors[i])
    for (let i = 1; i <= 5; i++)
        style.setProperty(`--btn-color--${i}`, btnColors[6 + i])
}

onMounted(() => {
    let color = props.color
    if (!color)
        return
    changeColor(color)
})

watch(() => props.color, (c: string | undefined) => {
    if (!c)
        return
    changeColor(c)
})

</script>
