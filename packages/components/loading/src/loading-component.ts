import {
    Component,
    VNode,
    Transition,
    defineComponent, h, withCtx, createCommentVNode, ref, onMounted
} from "vue"

import {cssVar} from "@yin-jinlong/h-ui/utils"

import {Running} from "./loading-running"
import {Circle} from "./loading-circle"
import {HLoadingOptions, HLoadingType} from "./type"
import {mergeStyle} from "./utils"

const INNER_LOADINGS: Record<HLoadingType,(() => Component)> = {
    running: Running,
    circle: Circle
}

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

function vIf(v: boolean | undefined, content: VNode, comment: string = 'if'): VNode {
    if (v)
        return content
    return createCommentVNode(comment)
}

function Loading(options: HLoadingOptions): VNode {

    const root = ref<HTMLElement>()

    function addStyle(root: HTMLElement) {
        mergeStyle(root, {
            backgroundColor: 'rgb(0, 0, 0, 0.6)',
            color: cssVar('color-primary'),
            height: '100%',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '100%',
            zIndex: '2147483647'
        })
    }

    let loadingComponent = () => {
        if (!options.component)
            return Circle()
        if (typeof options.component === 'string') {
            let c = INNER_LOADINGS[options.component]
            if (!c)
                throw new Error(`${options.component} is not a valid loading component name`)
            return c()
        }
        return options.component
    }

    function setup() {
        onMounted(() => {
            addStyle(root.value!)
        })
        return () => h('div', {
            ref: root,
            'data-flex-column-center': ''
        }, [
            h(loadingComponent()),
            vIf(!!options.text, h('div', {
                    'data-flex-column-center': ''
                }, [options.text]),
                'loading-text'
            )
        ])
    }

    return h(defineComponent(
        {
            setup
        }
    ))
}

export function createLoadingComponent(options: HLoadingOptions): Component {

    return defineComponent({
        name: 'HLoading',
        setup(_, ctx) {
            return () => {
                return h(
                    Transition,
                    {
                        appear: true,
                        onAppear: enter,
                        onLeave: leave,
                    }, {
                        default: withCtx(() => [vIf(options.loading, Loading(options))])
                    }
                )
            }
        }
    })
}
