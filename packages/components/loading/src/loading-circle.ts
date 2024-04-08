import {Component, defineComponent, h, onMounted, ref} from "vue"

import {cssVar} from "@yin-jinlong/h-ui/utils"
import {mergeStyle} from "./utils"

const animConfig = {
    iterations: Infinity,
    easing: 'linear',
} as KeyframeAnimationOptions

function addStyle(root: HTMLDivElement) {

    mergeStyle(root, {
        height: cssVar('loading-size', '30px'),
        position: 'relative',
        width: cssVar('loading-size', '30px'),
        stroke: cssVar('color-primary'),
        strokeWidth: cssVar('loading-stroke-width', '10%'),
    })

    mergeStyle(root.firstElementChild as HTMLElement, {
        transformOrigin: 'center',
        r: `calc(50% - ${cssVar('loading-stroke-width', '10%')})`,
    })

}

export function Circle(): Component {
    const root = ref<HTMLDivElement>()
    const circle = ref<HTMLDivElement>()

    function setup() {
        onMounted(() => {
            addStyle(root.value!)

            let off = Math.floor(Math.random() * 270)

            circle.value?.animate({
                rotate: [0, 360, 720].map(v => `${v + off}deg`),
            }, {
                ...animConfig,
                duration: 2300,
            })
            circle.value?.animate({
                strokeDasharray: ['10 90', '70 90', '80 90'],
                strokeDashoffset: ['0', '-40', '-100']
            }, {
                ...animConfig,
                duration: 1800,
            })
        })

        return () => h('svg', {
            ref: root,
            viewBox: '0 0 30 30',
        }, [
            h('circle', {
                ref: circle,
                cx: 15,
                cy: 15,
                fill: 'none'
            })
        ])
    }

    return defineComponent({
        name: 'h-loading-circle',
        setup
    })
}
