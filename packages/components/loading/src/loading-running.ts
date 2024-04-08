import {
    Component,
    defineComponent, h, ref, onMounted
} from "vue"

import {cssVar} from "@yin-jinlong/h-ui/utils"
import {mergeStyle} from "./utils"

function addStyle(root: HTMLDivElement) {

    mergeStyle(root, {
        height: cssVar('loading-size', '30px'),
        position: 'relative',
        width: cssVar('loading-size', '30px')
    })

    mergeStyle(root.children[0], {
        backgroundColor: cssVar('color-primary-1'),
        borderRadius: '100%',
        height: '100%',
        top: '0',
        width: '100%'
    })

    mergeStyle(root.children[1], {
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        top: '0',
        width: '100%',
    })

    mergeStyle(root.children[1].children[0], {
        borderBottom: 'dashed 2px grey',
        height: '100%',
        position: 'absolute',
        top: '-2px',
        width: '200%',
    })

}

export function Running(): Component {
    const root = ref<HTMLDivElement>()
    const role = ref<HTMLDivElement>()
    const line = ref<HTMLDivElement>()

    const animConfig = {
        iterations: Infinity,
        easing: 'linear'
    } as KeyframeAnimationOptions


    function setup() {

        function repeat<T>(count: number, eles: T[]): T[] {
            let r: T[] = []
            for (let i = 0; i < count; i++) {
                r = r.concat(eles)
            }
            return r
        }

        onMounted(() => {
            addStyle(root.value!)

            line.value?.animate({
                right: ['-100%', '0']
            }, {
                duration: 1000,
                ...animConfig
            })

            ;([{
                offset: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                translate: repeat(5, ['0 -25%', '0 -20%']),
                scale: repeat(5, ['1', '0.9'])
            }, {
                rotate: ['-45deg', '315deg'],
            }, {
                offset: [0, 0.25, 0.5, 0.75, 1],
                borderRadius: ['50% 50% 50% 0', '50% 50% 0 50%', '50% 0 50% 50%', '0 50% 50% 50%', '50% 50% 50% 0'],
            }] as PropertyIndexedKeyframes[]).forEach(k => {
                role.value?.animate(k, {
                    duration: 2000,
                    ...animConfig
                })
            })
        })

        return () => h('div', {
            ref: root
        }, [
            h('div', {
                ref: role
            }),
            h('div', {}, [
                    h('div', {
                        ref: line
                    })
                ]
            )
        ])

    }

    return defineComponent({
        name: 'h-loading-running',
        setup
    })
}
