<template>
    <div ref="child"
         class="h-tooltip-box"
         data-relative
         @mouseenter="onMouseIn"
         @mouseleave="onMouseOut">
        <slot/>
        <transition name="h-tool-tip-fade">
            <div v-show="mouseIn" ref="tipEle" :class="['h-tool-tip',tipClass]" :style="{zIndex}">
                <slot name="tip"/>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import DefaultProps, {HToolTipProps} from './props'

const props = withDefaults(defineProps<HToolTipProps>(), DefaultProps)
const child = ref<HTMLDivElement>()
const tipEle = ref<HTMLDivElement>()
const mouseIn = ref(false)

function placeInView(tip: HTMLDivElement, x: number, y: number, w: number, h: number) {
    let ww = window.innerWidth
    let wh = window.innerHeight
    tip.style.left = x + 'px'
    tip.style.top = y + 'px'

    let rect = tip.getBoundingClientRect()
    if (rect.left < 0) {
        tip.style.left = x + rect.left + 'px'
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
}

function onMouseOut(e: MouseEvent) {
    mouseIn.value = false
}

</script>
