<template>
    <transition @enter="enter" @leave="leave">
        <div v-if="loading"
             class="h-loading"
             data-flex-column-center
             @click.stop
             @mousedown.stop
             @mouseup.stop
             @mousemove.stop
             @keydoup.stop
             @keydown.stop>
            <component :is="component"/>
            <div class="h-loading-text" data-flex-column-center>
                {{ text }}
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import Running from "./running.vue";
import type {HLoadingProps} from "./props"

withDefaults(defineProps<HLoadingProps>(), {
    component: Running,
    text: ''
})

const animConfig = {
    duration: 200,
    fill: "forwards",
    easing: "ease-in"
} as KeyframeAnimationOptions

function enter(el: Element, done: () => void) {
    el.animate({
        opacity: [0, 1]
    }, animConfig).onfinish = done
}

function leave(el: Element, done: () => void) {
    el.animate({
        opacity: [1, 0]
    }, animConfig).onfinish = done
}

</script>
