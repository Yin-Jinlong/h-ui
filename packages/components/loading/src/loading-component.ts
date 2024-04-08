import {
    Component,
    VNode,
    Transition,
    defineComponent, h, withCtx, createCommentVNode, ref, onMounted
} from "vue"

import {convertColor, cssVar, cssVarName} from "@yin-jinlong/h-ui/utils"

import {Running} from "./loading-running"
import {Circle} from "./loading-circle"
import {ComponentFn, HLoadingOptions} from "./type"
import {mergeStyle} from "./utils"

const NAMED_LOADINGS: Record<string, (ComponentFn)> = {
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

function Loading(el: HTMLElement, options: HLoadingOptions): VNode {

    const root = ref<HTMLElement>()

    function addStyle(root: HTMLElement) {

        mergeStyle(root, {
            backgroundColor: cssVar('loading-modal-color'),
            color: cssVar('loading-color'),
            height: '100%',
            left: `${el.scrollLeft}px`,
            position: 'absolute',
            top: `${el.scrollTop}px`,
            width: '100%',
            zIndex: '2147483647'
        })

        let modal = ((model) => {
            if (typeof model === 'boolean') {
                return model ? 'rgba(0,0,0,0.6)' : 'transparent'
            }
            return convertColor(model)
        })(options.modal)

        root.style.setProperty(cssVarName('loading-color'), convertColor(options.color))
        root.style.setProperty(cssVarName('loading-modal-color'), modal)
        root.style.setProperty(cssVarName('loading-size'), options.size)
        root.style.setProperty(cssVarName('loading-stroke-width'), options.width)
    }

    let loadingComponent = () => {
        if (typeof options.component === 'string') {
            let c = NAMED_LOADINGS[options.component]
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

export function createLoadingComponent(el: HTMLElement, options: HLoadingOptions): Component {

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
                        default: withCtx(() => [vIf(options.loading, Loading(el, options))])
                    }
                )
            }
        }
    })
}

/**
 * 注册全局loading组件，在vLoading的component中使用
 * @param name 注册名
 * @param component 组件
 */
export function registerLoadingComponent(name: string, component: ComponentFn) {
    if (NAMED_LOADINGS[name])
        throw new Error(`${name} is already registered`)
    NAMED_LOADINGS[name] = component
}
