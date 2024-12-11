<template>
    <div ref="child"
         class="h-tooltip-box"
         data-relative
         @mousemove="resetTimeOut"
         @mouseenter="props.body? onMouseInBody($event):onMouseIn($event)"
         @mouseleave="onMouseOut">
        <slot/>
        <teleport v-if="body" to="body">
            <transition name="h-tool-tip-fade">
                <div v-if="mouseIn" ref="tipEle" :class="['h-tool-tip',tipClass]"
                     :style="{ zIndex}">
                    <slot name="tip"/>
                </div>
            </transition>
        </teleport>
        <transition v-else name="h-tool-tip-fade">
            <div v-show="mouseIn" ref="tipEle" :class="['h-tool-tip',tipClass]" :style="{zIndex}">
                <slot name="tip"/>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import {packRange} from '@yin-jinlong/h-ui/utils/range'
import {nextTick, ref} from 'vue'
import DefaultProps, {HToolTipProps} from './props'

const props = withDefaults(defineProps<HToolTipProps>(), DefaultProps)
const child = ref<HTMLDivElement>()
const tipEle = ref<HTMLDivElement>()
const mouseIn = ref(false)
let timeoutId = 0


function placeInViewBody(tip: HTMLDivElement, x: number, y: number, w: number, h: number) {
    let ww = window.innerWidth
    let wh = window.innerHeight
    x = packRange(x, 0, ww - w)
    y = packRange(y, 0, wh - h)
    tip.style.left = x + 'px'
    tip.style.top = y + 'px'
}

function placeTipBody(tip: HTMLDivElement, cr: DOMRect, tr: DOMRect) {
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
    placeInViewBody(tip, x, y, tr.width, tr.height)
}

async function onMouseInBody(e: MouseEvent) {
    mouseIn.value = true
    await nextTick()
    let rect = child.value!.getBoundingClientRect()
    let tipRect = tipEle.value!.getBoundingClientRect()
    placeTipBody(tipEle.value!, rect, tipRect)
    resetTimeOut()
}

function placeInView(tip: HTMLDivElement, x: number, y: number, w: number, h: number) {
    let ww = window.innerWidth
    let wh = window.innerHeight
    tip.style.left = x + 'px'
    tip.style.top = y + 'px'

    let rect = tip.getBoundingClientRect()
    if (rect.left < 0) {
        tip.style.left = x - rect.left + 'px'
    } else if (rect.right > ww) {
        tip.style.left = x - (rect.right - ww) + 'px'
    }

    if (rect.bottom > wh) {
        tip.style.top = y - (rect.bottom - wh) + 'px'
    } else if (rect.top < 0) {
        tip.style.top = y + rect.top + 'px'
    }
}

function placeTip(tip: HTMLDivElement, content: HTMLElement) {
    let x: number, y: number
    let off = props.offset
    let wh = window.innerHeight
    let dw2 = (content.offsetWidth - tip.offsetWidth) / 2
    let dh2 = (content.offsetHeight - tip.offsetHeight) / 2
    switch (props.place) {
        case 'left':
            x = -tip.offsetWidth - off
            y = dh2
            break
        case 'right':
            x = content.offsetWidth + off
            y = dh2
            break
        case 'top':
            x = dw2
            y = -tip.offsetHeight - off
            break
        case 'bottom':
            x = dw2
            y = content.offsetHeight + off
            break
        default :
            let rect = content.getBoundingClientRect()
            let up = rect.top + rect.height / 2 >= wh / 2
            x = dw2
            y = up ? -tip.offsetHeight - off : content.offsetHeight + off
    }
    placeInView(tip, x, y, tip.offsetWidth, tip.offsetHeight)
}

async function onMouseIn(e: MouseEvent) {
    mouseIn.value = true
    await nextTick()
    placeTip(tipEle.value!, child.value!)
    resetTimeOut()
}

function onMouseOut(e: MouseEvent) {
    mouseIn.value = false
}

function resetTimeOut() {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        mouseIn.value = false
    }, props.timeout) as unknown as number
}

</script>
