<template>
    <div ref="child"
         class="h-tooltip-box"
         @mouseenter="onMouseIn"
         @mouseleave="onMouseOut">
        <slot/>
        <teleport to="body">
            <transition name="h-tool-tip-fade">
                <div v-if="mouseIn" :style="{
                    zIndex
                }" ref="tipEle" :class="['h-tool-tip',tipClass]">
                    <slot name="tip"/>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import {packRange} from '@yin-jinlong/h-ui/utils/range'
import DefaultProps, {HToolTipProps} from './props'
import {ref, nextTick} from 'vue'

const props = withDefaults(defineProps<HToolTipProps>(), DefaultProps)
const child = ref<HTMLDivElement>()
const tipEle = ref<HTMLDivElement>()
const mouseIn = ref(false)

function placeInView(tip: HTMLDivElement, x: number, y: number, w: number, h: number) {
    let ww = window.innerWidth
    let wh = window.innerHeight
    x = packRange(x, 0, ww - w)
    y = packRange(y, 0, wh - h)
    tip.style.left = x + 'px'
    tip.style.top = y + 'px'
}

function placeTip(tip: HTMLDivElement, cr: DOMRect, tr: DOMRect) {
    let x: number, y: number
    let wh = window.innerHeight
    let dw2 = (cr.width - tr.width) / 2
    let dh2 = (cr.height - tr.height) / 2
    switch (props.place) {
        case 'left':
            x = cr.left - tr.width - props.offset
            y = cr.top + dh2
            break
        case 'right':
            x = cr.right + props.offset
            y = cr.top + dh2
            break
        case 'top':
            x = cr.left + dw2
            y = cr.top - tr.height - props.offset
            break
        case 'bottom':
            x = cr.left + dw2
            y = cr.bottom + props.offset
            break
        default :
            let up = cr.top + cr.height / 2 >= wh / 2
            x = cr.left + dw2
            y = (up ? cr.top : cr.bottom)
                + (up ? -tr.height - props.offset : props.offset)
    }
    placeInView(tip, x, y, tr.width, tr.height)
}

async function onMouseIn(e: MouseEvent) {
    mouseIn.value = true
    await nextTick()
    let rect = child.value!.getBoundingClientRect()
    let tipRect = tipEle.value!.getBoundingClientRect()
    placeTip(tipEle.value!, rect, tipRect)
}

function onMouseOut(e: MouseEvent) {
    mouseIn.value = false
}

</script>
